import { getNotFoundMessage } from '../../../config/theme/selectors';

const NotFoundPage = () => {
  return (
    <div>
      <p>{getNotFoundMessage()}</p>
    </div>
  );
};

export default NotFoundPage;
