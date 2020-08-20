import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { server } from '../src/server'
import customAxios from '../src/customAxios'
import Router from 'next/router'

const AddStory = () => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);

    const { handleSubmit, errors, register } = useForm({
        defaultValues: {
            title: 'title1',
            description: 'desc'
        }
    });

    const onAdd = async (formData) => {
        setSubmitting(true);
        try {
            const res = await axios.post(`${server}/api/stories`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            M.toast({ html: res.data.msg });
            Router.push('/');
        } catch (err) {
            console.error(err);
            if (err.response) {
                M.toast({ html: err.response.data.error });
            }
        }

        setSubmitting(false);
    }

    return (
        <div className='container'>
            <h1>Add Story</h1>
            <form onSubmit={handleSubmit(onAdd)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="title">Title</label>
                    {errors.title ? <span className="red-text helper-text">
                        {errors.title.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="description">Description</label>
                    {errors.description ? <span className="red-text helper-text">
                        {errors.description.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='btn red'>
                        Add Story
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddStory;

export const getServerSideProps = async (ctx) => {
    try {
        await customAxios(`${server}/api/me`, ctx, `${server}/login`);
        return { props: {} };
    } catch (err) {
        console.error(err);
        return {
            props: {}
        }
    }
}