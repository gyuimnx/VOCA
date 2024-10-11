import React from 'react';
import './ListChapter.css';

function ListChapter({ chapters, DeleteChapter }) {
    return (
        <div className="ListChapter">
            <h2 className='ChapterSet'>Chapter List</h2>
            {chapters.length === 0 ? (
                <p>생성된 챕터가 없습니다.</p>
            ) : (
                <div className='ChapterContainer'>
                    {chapters.map((chapter, index) => (
                        <div key={index} className='ChapterItem'>
                            {chapter.name}
                            <div className='Btns'>
                                <button className='CorrBtn'>수정</button>
                                <button className='DeleteBtn' onClick={() => DeleteChapter(index)}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListChapter;