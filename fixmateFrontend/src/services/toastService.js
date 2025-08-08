import toast from 'react-hot-toast';

export const getToastSuccess = (message)=>{
    return toast.success(message,
        {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        }
    )
}

export const getToastError = (message)=>{
    return toast.error(message,
        {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        }
    )
}