import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';

export default function Update(props) {
  return (
    <div>
      <UpdateItem id={props.query.id} />
    </div>
  );
}
