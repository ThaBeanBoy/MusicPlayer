import { ReactNode, createContext, useContext, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { cn } from '../utils/cn';

type toastProps = Toast.ToastProps & React.RefAttributes<HTMLLIElement>;

const ToastContext = createContext<(content: toastProps) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [props, setProps] = useState<toastProps>(<>Hi</>);

  const toast = (props: toastProps) => {
    setProps(props);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={toast}>
      <Toast.Provider swipeDirection='right'>
        {children}

        <Toast.Root
          className={cn(
            'bg-white fixed right-4 bottom-4 w-full max-w-md rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut',
            props.className
          )}
          open={open}
          onOpenChange={setOpen}
          {...props}
        />

        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
