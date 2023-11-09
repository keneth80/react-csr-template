import {useState} from 'react';
import Modal from '../componenets/common/Modal';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(true);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <h1>Home</h1>
            <p>Home 페이지입니다.</p>
            <button onClick={openModal}>show Modal</button>
            <>{modalVisible && <Modal $visibled={modalVisible} closable={true} maskClosable={true} onClose={closeModal}></Modal>}</>
        </div>
    );
}
