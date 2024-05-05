import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const {courses} = useContext(Context)
    const pageCount = Math.ceil(courses.totalCount / courses.limit)
    const pages = []
    for(let i = 0; i < pageCount; i++){
        pages.push(i+1);
    }
    return (
        <Pagination className='ml-5'>
            {pages.map(page => 
                <Pagination.Item key={page} active={courses.page === page} onClick={() => courses.setPage(page)}>{page}</Pagination.Item>
            )}
        </Pagination>
    )
});

export default Pages;