import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Chapter.css'
import ListChapter from "./ListChapter";

function Chapter() {
    const [chapters, setChapters] = useState([]); // chapter 모음
    const [newChapter, setNewChapter] = useState(''); // 새 챕터
    const [createOpen, setCreateOpen] = useState(false); // 새 챕터 만들기 눌렀나
    // const [edit, setEdit] = useState = (null); // 챕터 수정
    const navigate = useNavigate();

    // 새 챕터 만들기 함수 (근데 어캐하지 이거 맞나)
    function handleCreateChapter(e) {
        e.preventDefault();
        if (newChapter.trim()) {
            const newChapterObj = { name: newChapter, words: [] };
            const updatedChapters = [...chapters, newChapterObj];
            setChapters(updatedChapters);
            localStorage.setItem('chapters', JSON.stringify(updatedChapters));
            setNewChapter('');
            setCreateOpen(false);
        };
    };

    // 챕터 목록 불러오기
    useEffect(() => {
        const storedChapters = JSON.parse(localStorage.getItem('chapters')) || [];
        setChapters(storedChapters);
    }, []);

    // 챕터 삭제 함수
    function DeleteChapter(index) {
        const updatedChapters = chapters.filter((_, i) => i !== index); //filter로 삭제할 챕터를 제외한 새 배열 생성
        setChapters(updatedChapters); // state 업데이트
        localStorage.setItem('chapters', JSON.stringify(updatedChapters)); // 로컬스토리지 업데이트
    }

    function handleChapterClick(chapterName) {
        navigate(`/Word/${encodeURIComponent(chapterName)}`);
    }

    return (
        <div className="Chapter">
            <h1 className="Header">
                <div className="VOCA">VOCA</div>
                <button
                    className="CreateBtn"
                    onClick={() => setCreateOpen(true)}
                >
                    새 챕터 만들기
                </button>
            </h1>

            {createOpen && (
                <div className="ModalOverlay">
                    <div className="Modal">
                        <h2 className="ModalTitle">새 챕터 만들기</h2>
                        <form onSubmit={handleCreateChapter} className="ChapterForm">
                            <input
                                type="text"
                                value={newChapter}
                                onChange={(e) => setNewChapter(e.target.value)}
                                placeholder="챕터 이름 입력"
                            />
                            <div className="ModalBtn">
                                <button type="submit" className="submitBtn">추가</button>
                                <button type="button" className="cancelBtn" onClick={() => setCreateOpen(false)}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div className="ChapterList">
                <ListChapter chapters={chapters} DeleteChapter={DeleteChapter} onChapterClick={(chapter) => handleChapterClick(chapter.name)} setChapters={setChapters}/>
            </div>
            <div className="QuizArea">
                <button className="QuizBtn">Quiz</button>
            </div>
        </div>
    );
}

export default Chapter;