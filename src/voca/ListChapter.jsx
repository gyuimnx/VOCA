import React from 'react';
import './ListChapter.css';

function ListChapter({ chapters, DeleteChapter, onChapterClick, setChapters }) {
    const handleCorrChapter = (e, index, currentName) => {
        e.stopPropagation();
        const newName = prompt("챕터 이름 수정", currentName);
        if (newName && newName.trim()) {
            const updatedChapters = JSON.parse(localStorage.getItem('chapters'));
            updatedChapters[index].name = newName.trim();
            localStorage.setItem('chapters', JSON.stringify(updatedChapters));
            setChapters(updatedChapters); //이게 재랜더링 시키는 역할임
        }
    };

    return (
        <div className="ListChapter">
            <h2 className='ChapterSet'>나의 챕터 목록</h2>
            {chapters.length === 0 ? (
                <p className='empty'>생성된 챕터가 없습니다.</p>
            ) : (
                <div className='ChapterContainer'>
                    {chapters.map((chapter, index) => (
                        <div key={index} className='ChapterItem' onClick={() => onChapterClick(chapter)}>
                            {chapter.name}
                            <div className='Btns'>
                                <button className='CorrBtn' onClick={(e) => {
                                    handleCorrChapter(e, index, chapter.name)
                                }}>수정</button>
                                <button className='DeleteBtn' onClick={(e) => {
                                    e.stopPropagation();
                                    if(window.confirm('챕터를 삭제하시겠습니까?')){
                                        DeleteChapter(index);
                                    }
                                }}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
// 버튼에 e.stopPropagation : 버튼 클릭 이벤트가 상위로 전파되지 않도록 함

export default ListChapter;