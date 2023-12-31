import React, { useState, useEffect, useRef } from 'react';
import './MathGame.css';

import iconPlay from './img/play.png';

import { AiFillClockCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BsArrowRepeat } from 'react-icons/bs'

export default function Teste() {
    const [started, setStarted] = useState(false);
    // Controlar se o jogo já começou.

    const [countdown, setCountdown] = useState('');
    // Controla o tempo das partidas.

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    // Números sorteados.

    const result = number1 * number2;
    // Resposta da multiplicação dos números sorteados.

    const [response, setResponse] = useState('');
    // Resposta do usuário.

    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const inputRef = useRef(null);

    const [changeClassName, setChangeClassName] = useState(true);
    // Muda a classe do input. 
    // Fiz isso para ativar a animação caso a resposta esteja errada.

    const [score, setScore] = useState(0)

    useEffect(() => {
        let countdownInterval;
        if (started) {
            countdownInterval = setInterval(() => {
                if (countdown > 0) {
                    setCountdown(countdown - 1);
                } else {
                    clearInterval(countdownInterval);
                    setIsInputDisabled(true);
                }
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }

        return () => clearInterval(countdownInterval);
    }, [started, countdown]);


    useEffect(() => {
        if (started && inputRef.current) {
            inputRef.current.focus();
        }
    }, [started]);

    useEffect(() => {
        // Adicione um event listener para o evento 'keydown' no documento.
        const handleKeyDown = (event) => {
            // Verifique se o jogo já começou e se a tecla pressionada é a tecla de espaço.
            if (started && event.key === ' ') {
                handleStart();
            }
        };

        // Adicione o event listener quando o componente for montado.
        document.addEventListener('keydown', handleKeyDown);

        // Remova o event listener quando o componente for desmontado.
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [started]);

    function sortNumbers() {
        setNumber1(Math.floor(Math.random() * 10) + 1);
        setNumber2(Math.floor(Math.random() * 10) + 1);

        if (countdown === 0) {
            setIsInputDisabled(true);
        }
    }

    // Sorteio dos números.

    function handleStart() {
        setStarted(true);
        sortNumbers();
        setResponse('');
        setCountdown(30)
        setIsInputDisabled(false);
        setScore(0);
    }

    function checkResponse(e) {
        e.preventDefault();

        if (response === result) {
            sortNumbers();
            setResponse('');
            setChangeClassName(true);
            setScore(score + 1);
        } else {
            setResponse('');
            setChangeClassName(false);

            if (score > 0) {
                setScore(score - 1);
            } else {
                setScore(score + 0);
            }
        }
    }

    return (
        <div>

            {started ? (
                <div className="game-container">

                    <header>

                        <div className='countdown'>
                            <h1>{countdown}</h1>
                            <AiFillClockCircle size={28} color="#F5CB5C" />
                        </div>

                        <div className="score-container">
                            <h2>Score: </h2>
                            <h1>{score}</h1>
                        </div>

                    </header>

                    <div className="content">

                        <div className="question">
                            <p>{number1}</p>
                            <IoClose size={30} color="#F5CB5C" />
                            <p>{number2}</p>
                        </div>

                        <form onSubmit={checkResponse}>

                            <input
                                ref={inputRef}
                                value={response}
                                onChange={(e) => setResponse(parseInt(e.target.value))}
                                type="number"
                                className={changeClassName ? 'input-correct' : 'input-uncorrect'}
                                disabled={isInputDisabled}
                            />

                        </form>

                        <div className='container-restart' >
                            <button onClick={handleStart}>
                                <BsArrowRepeat size={65} color="#F5CB5C" />
                            </button>

                            <p>( Space to Restart! )</p>
                        </div>

                    </div>

                    {countdown === 0 ? (
                        <div className="time-is-over-container">
                            <p>Tempo esgotado!</p>
                        </div>
                    ) : (
                        <div className="time-is-over-container" />
                    )}

                </div>
            ) : (
                <div className="start-button-container">
                    <button className="start-button" onClick={handleStart}>
                        <img src={iconPlay} alt="icon-play" />
                    </button>

                    <div className="select-game-mode">

                        {/* <h1>SELECT GAME MODE</h1>

                        <div className='button-container'>

                            <button>
                                <h1>Fast</h1>
                            </button>

                            <button>
                                <h1>Normal</h1>
                            </button>

                            <button>
                                <h1>Long</h1>
                            </button>

                        </div> */}

                    </div>

                </div>
            )}
        </div>
    );
}
