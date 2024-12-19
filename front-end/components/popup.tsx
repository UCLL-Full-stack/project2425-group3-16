// import React from 'react';
// import ButtonComponent from './button';
//
// type Props = {
//     title: string;
//     content: string;
//     onConfirm: () => void;
//     onCancel: () => void;
// };
//
// const PopupComponent: React.FC<Props> = ({ title, content, onConfirm, onCancel }: Props) => {
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">{title}</h2>
//                 <p className="mb-6">{content}</p>
//                 <div className="flex justify-around">
//                     <ButtonComponent label="Cancel" color="blue" onClick={onCancel} />
//                     <ButtonComponent label="Confirm" color="red" onClick={onConfirm} />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PopupComponent;