import React, { useState } from "react";
import './Chapter.css'
import ListChapter from "./ListChapter";

function Chapter() {
    const [chapters, setChapters] = useState([]); // chapter 모음
    const [newChapter, setNewChapter] = useState(''); // 새 챕터
    const [createOpen, setCreateOpen] = useState(false); // 새 챕터 만들기 눌렀나
    // const [edit, setEdit] = useState = (null); // 챕터 수정

    // 새 챕터 만들기 함수 (근데 어캐하지 이거 맞나)
    function handleCreateChapter(e) {
        e.preventDefault();
        if (newChapter.trim()) {
            setChapters([...chapters, { name: newChapter }]);
            setNewChapter('');
            setCreateOpen(false);
        }
    }

    return (
        <div className="Chapter">
            <h1 className="Header">
                <div>보카</div>
                <button 
                    className="CreateBtn"
                    onClick={()=>setCreateOpen(true)}
                >
                    챕터 추가
                </button>
            </h1>

            {createOpen && (
                <div className="ModalOverlay">
                    <div className="Modal">
                        <h3 className="ModalTitle">새 챕터 만들기</h3>
                        <form onSubmit={handleCreateChapter}>
                            <input 
                                type="text"
                                value={newChapter}
                                onChange={(e) => setNewChapter(e.target.value)}
                                placeholder="챕터 이름 입력"
                            />
                            <div className="ModalBtn">
                                <button type="submit">생성</button>
                                <button type="button" onClick={() => setCreateOpen(false)}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ListChapter />
            <div className="Quiz">
                <button className="QuizBtn">Quiz</button>
            </div>
        </div>
    );
}

export default Chapter;