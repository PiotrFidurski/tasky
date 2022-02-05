import { Task } from '@prisma/client';
import { Link } from 'remix';

function TaskComponent({ task }: { task: Task }) {
  return (
    <article className="py-4 px-2 shadow-md mb-2 rounded flex items-center justify-between">
      <Link className="font-semibold text-slate-600" to={`/home/${task.id}`}>
        {task.body}
      </Link>
      <button type="button" className="uppercase font-bold text-slate-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </article>
  );
}

export { TaskComponent };
