
import CollapsibleSection from '../../../components/layouts/CollapsibleSection/CollapsibleSection';
import FieldGroup from '../../../components/layouts/FieldGroup/FieldGroup';
import PhoneNumberField from '../../../components/ui/PhoneNumber/PhoneNumberField';
import SelectField from '../../../components/ui/Select/SelectField';
import TextField from '../../../components/ui/Text/TextField';
import TextAreaField from '../../../components/ui/TextArea/TextAreaField';
import { useFormData } from '../../../contexts/FormDataContext';
import useFieldData from '../../hooks/useFieldData';
import { memo } from 'react';




const componentMap = {
    'string': TextField,
    'number': PhoneNumberField,
    'email': TextField,
    'select': SelectField,
    'field-group': FieldGroup,
    'section': CollapsibleSection,
    'long-text': TextAreaField
    // Add other field types and their corresponding components here
}

const FormComponentFactory = memo(({type, ...formProps}) => {

    const {formId, formPath} = useFormData();
    const data = useFieldData({field: {type, ...formProps}});
    const FormComponent = componentMap[type];

    if (!FormComponent) {
        return <div>Unsupported form component: {type}</div>;
    }

    if(type==='field-group' || type==='section') {
        return <FormComponent {...data}>
            {data.fields.map((field) => <FormComponentFactory key={`${formPath}-${formId}-${field?.name || type}`} {...field}/>)}
        </FormComponent>
    }


    return <FormComponent {...data} />;
}, (prevProps, nextProps) => prevProps.name === nextProps.name);

export default FormComponentFactory;