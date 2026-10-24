import DynamicApplyPage from '../[id]/page';

export default function IncomePage() {
  return <DynamicApplyPage params={Promise.resolve({ id: 'income' })} />;
}
