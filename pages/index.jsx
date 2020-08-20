import { server } from '../src/server';
import customAxios from '../src/customAxios';
import Link from 'next/link';

export default function Home({ stories }) {
  return (
    <div className='container'>
      <h3>Stories</h3>
      <ul className="collection">
        {stories.map(story => <li className='collection-item' key={story._id}>
          <Link as={`/story/${story._id}`} href='/story/[id]'>
            <a>
              {story.title}
            </a>
          </Link>
        </li>)}
      </ul>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  try {
    const data = await customAxios(`${server}/api/stories`, ctx, `${server}/login`);

    if (data) {
      return {
        props: {
          stories: data.data
        }
      };
    }
    return { props: {} };
  } catch (err) {
    console.error(err);
    return {
      props: {}
    }
  }
}