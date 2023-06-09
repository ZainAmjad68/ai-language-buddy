import React, {FormEvent, useRef} from 'react';
import { ReactComponent as Submit } from '../images/submit.svg';

interface TextInputProps {
  placeholder: string;
  onSubmit: (value: string) => void
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, onSubmit }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const submittedValue = inputRef.current?.value;
        if (submittedValue) {
            onSubmit(submittedValue);
            event.currentTarget.reset();
          }
        inputRef.current?.focus();
    };
        
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
                <input
                    ref={inputRef}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder={placeholder}
                />
                <button type='submit'>
                    <Submit className='m-1' width="36" height="36" />
                </button>
            </div>
        </form>
    );
};

export default TextInput;
