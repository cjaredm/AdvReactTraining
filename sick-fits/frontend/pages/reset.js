import Link from 'next/link';
import ResetPassword from '../components/ResetPassword';

const Reset = props => (
  <div>
    <p>Reset Your Password {props.query.resetToken}</p>
    <ResetPassword resetToken={props.query.resetToken} />
  </div>
);

export default Reset;
