import { useNavigate } from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

export function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex p-2">
      <Button className="w-auto" onClick={() => navigate(-1)}>
        <div className="w-full">
          <ArrowleftIcon />
        </div>
      </Button>
    </div>
  );
}
