import { useSearchParams } from 'react-router-dom';
import MyCreateForm from './myCreateForm';
import FormProvider from '../../context/form';
import MyFillForm from './myFillForm';
import MyFillFormProvider from '../../context/myFillForm';
import { TagProvider } from '../../context/tag';

export default function Form() {
  const [searchParams, _] = useSearchParams();
  const sidebar = searchParams.get('sidebar');
  const render = () => {
    if (sidebar === 'mycreate' || sidebar === null) {
      return (
        <TagProvider>
          <FormProvider>
            <MyCreateForm />
          </FormProvider>
        </TagProvider>
      );
    } else {
      return (
        <MyFillFormProvider>
          <MyFillForm />;
        </MyFillFormProvider>
      );
    }
  };
  return <>{render()}</>;
}
