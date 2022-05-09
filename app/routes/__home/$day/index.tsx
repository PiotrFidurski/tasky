import { useParams } from 'remix';

export default function CompletedDayRoute() {
  const params = useParams();
  return <div>Completed task widget goes here, for: {params.day}</div>;
}
