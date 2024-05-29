export type Modal = {
    isOpen: boolean;
    title: string;
    content: string[];
    onConfirm: () => void;
}