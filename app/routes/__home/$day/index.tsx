import { useParams } from 'remix';

export default function IndexRoute() {
  const params = useParams<'day'>();

  return <div>tasks for day: {params.day}</div>;
}
