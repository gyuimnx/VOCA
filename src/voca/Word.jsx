// 코드리뷰 한 번 해야함 필요없는 거 빼고 필요한 거 수정하고
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Word.css';

function Word() {
    // 1. 상태 관리
    const location = useLocation(); // 현재 URL 정보를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 함수
    const [chapter, setChapter] = useState(null); // 현재 챕터 정보
    const [newWord, setNewWord] = useState({ word: '', meaning: '' }); // 새로운 단어 입력값
    const [isAddingWord, setIsAddingWord] = useState(false); // 단어 추가 폼 표시 여부

    // 2. 컴포넌트 마운트 시 챕터 정보 로드
    useEffect(() => {
        // URL에서 챕터 이름 추출 (/Word/Chapter1 -> Chapter1)
        const chapterName = decodeURIComponent(location.pathname.split('/').pop());
        // localStorage에서 전체 챕터 데이터 가져오기
        const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
        // 현재 챕터 찾기
        const currentChapter = chapters.find(ch => ch.name === chapterName);

        if (currentChapter) {
            setChapter(currentChapter);
        } else {
            // 챕터가 없으면 챕터 목록 페이지로 이동
            navigate('/Chapter');
        }
    }, [location, navigate]);

    // 3. 단어 추가 함수
    const handleAddWord = (e) => {
        e.preventDefault();
        if (newWord.word.trim() && newWord.meaning.trim()) {
            // localStorage에서 전체 챕터 데이터 가져오기
            const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
            // 현재 챕터의 단어 목록 업데이트
            const updatedChapters = chapters.map(ch => {
                if (ch.name === chapter.name) {
                    return {
                        ...ch,
                        words: [...ch.words, newWord]
                    };
                }
                return ch;
            });

            // 업데이트된 데이터 저장
            localStorage.setItem('chapters', JSON.stringify(updatedChapters));
            // 현재 챕터 정보 업데이트
            setChapter(updatedChapters.find(ch => ch.name === chapter.name));
            // 입력 폼 초기화
            setNewWord({ word: '', meaning: '' });
            setIsAddingWord(false);
        }
    };

    // 4. 단어 삭제 함수
    const handleDeleteWord = (index) => {
        const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
        // 해당 인덱스의 단어만 제외하고 새 배열 생성
        const updatedChapters = chapters.map(ch => {
            if (ch.name === chapter.name) {
                return {
                    ...ch,
                    words: ch.words.filter((_, i) => i !== index)
                };
            }
            return ch;
        });

        localStorage.setItem('chapters', JSON.stringify(updatedChapters));
        setChapter(updatedChapters.find(ch => ch.name === chapter.name));
    };

    const goToHome = () => {
        navigate('/');
    }

    if (!chapter) return <div>Loading...</div>;

    return (
        <div className="Word">
            <header className="WordHeader">
                <button className="BackBtn" onClick={goToHome}><img className="BackImg" src="/img/arrow.png" alt="back" /></button>
                <h1>{chapter.name}</h1>
                <button
                    className="AddWordBtn"
                    onClick={() => setIsAddingWord(true)}
                >
                    단어 추가
                </button>
            </header>

            {isAddingWord && (
                <div className="WordModalOverlay">
                    <div className="WordModal">
                        <h2>새 단어 추가하기</h2>
                        <form onSubmit={handleAddWord}>
                            <div className="InputGroup">
                                <input
                                    type="text"
                                    placeholder="단어"
                                    value={newWord.word}
                                    onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                                />
                            </div>
                            <div className="InputGroup">
                                <input
                                    type="text"
                                    placeholder="의미"
                                    value={newWord.meaning}
                                    onChange={(e) => setNewWord({ ...newWord, meaning: e.target.value })}
                                />
                            </div>
                            <div className="FormButtons">
                                <button type="submit" className="SubmitBtn">추가</button>
                                <button
                                    type="button"
                                    className="CancelBtn"
                                    onClick={() => setIsAddingWord(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="WordList">
                {chapter.words.length === 0 ? (
                    <h2 className="EmptyMessage">등록된 단어가 없습니다.</h2>
                ) : (
                    <div className="WordItems">
                        {chapter.words.map((word, index) => (
                            <div key={index} className="WordItem">
                                <div className="WordContent">
                                    <span className="WordText">{word.word}</span>
                                    <span className="WordMeaning">{word.meaning}</span>
                                </div>
                                <div className="WordBtns">
                                    <button
                                        className="CorrWordBtn"
                                        onClick={() => handleDeleteWord(index)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="DeleteWordBtn"
                                        onClick={() => handleDeleteWord(index)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Word;