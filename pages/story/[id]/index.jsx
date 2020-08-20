import React from 'react'
import Router from 'next/router'
import customAxios from '../../../src/customAxios'
import { server } from '../../../src/server';

const SingleStory = ({ story, user }) => {

    const onDelete = async e => {
        console.log('delete me');
    }

    return (
        <div className='container'>
            <h3>
                {story.title}
            </h3>
            <p className="flow-text">
                {story.description}
            </p>
            {story._id.toString() === user._id.toString() ? <button className='btn red' onClick={onDelete}>
                Delete
            </button> : null}
        </div>
    )
}

export default SingleStory;

export const getServerSideProps = async (ctx) => {
    try {
        const user = await customAxios(`${server}/api/me`, ctx, `${server}/login`);
        const story = await customAxios(`${server}/api/stories/${ctx.query.id}`, ctx, `${server}/login`);
        return {
            props: {
                story: story.data,
                user: user.data
            }
        };
    } catch (err) {
        console.error(err);
        return {
            props: {}
        }
    }
}


