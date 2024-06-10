import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
type BackButtonProps = {
    title?: string;
    iconWidth?: number;
}
function BackButton({ title = "", iconWidth }: BackButtonProps) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleGoBack} className='flex items-center gap-1 text-gray-400'>
            <ArrowLeft width={iconWidth} /> {title}
        </button>
    );
}

export default BackButton;