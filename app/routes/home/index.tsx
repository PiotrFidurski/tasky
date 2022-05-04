import { Calendar } from '~/components/Widgets/Calendar';

export default function IndexRoute() {
  return (
    <div>
      <Calendar date={new Date()} />
    </div>
  );
}
