import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleGoBack}>
            <ArrowLeft />
        </button>
    );
}

export default BackButton;