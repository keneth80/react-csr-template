import React, {useEffect} from 'react';
import styled from 'styled-components';

function Modal({
    className,
    onClose,
    maskClosable,
    closable,
    $visibled
}: {
    className?: string;
    onClose: (e: any) => void;
    maskClosable: boolean;
    closable: boolean;
    $visibled: boolean;
}) {
    const onMaskClick = (e: any) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    // 이전방문 날짜
    const VISITED_BEFORE_DATE = localStorage.getItem('VisitCookie');
    // 현재 날짜
    const VISITED_NOW_DATE = Math.floor(new Date().getDate()) + '';

    // console.log(VISITED_BEFORE_DATE)
    // console.log(VISITED_NOW_DATE)
    // localStorage.removeItem('VisitCookie')

    useEffect(() => {
        // 팝업 오늘 하루닫기 체크
        if (VISITED_BEFORE_DATE !== null) {
            // 날짜가 같을경우 노출
            if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
                localStorage.removeItem('VisitCookie');
                onClose(true);
            }
            // 날짜가 다를경우 비노출
            if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
                onClose(false);
            }
        }
    }, [VISITED_BEFORE_DATE, VISITED_NOW_DATE, onClose]);

    // 하루동안 팝업 닫기
    const Dayclose = (e: any) => {
        if (onClose) {
            onClose(e);

            const expiry = new Date();
            // +1일 계산
            const expiryDate = expiry.getDate() + 1;
            // 로컬스토리지 저장
            localStorage.setItem('VisitCookie', expiryDate + '');
        }
    };

    const close = (e: any) => {
        if (onClose) {
            onClose(e);
        }
    };

    return (
        <div>
            <ModalOverlay $visibled={$visibled} />
            <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" $visibled={$visibled}>
                <ModalContentContainer tabIndex="0" className="modal-inner">
                    <ModalContent>
                        <ImgContainer>
                            <a href="https://www.pping.kr" rel="noopener noreferrer" target={'_blank'}>
                                <img
                                    src="./img/KakaoTalk_20230119_083235223_012.jpg"
                                    style={{width: '100%', height: '100%', borderRadius: '15px 15px 0 0'}}
                                    alt=""
                                />
                            </a>
                        </ImgContainer>
                        {closable && (
                            <CloseContainer>
                                <Close className="modal-close" onClick={Dayclose}>
                                    오늘 하루 닫기
                                </Close>
                                <Close className="modal-close" onClick={close}>
                                    닫기
                                </Close>
                            </CloseContainer>
                        )}
                    </ModalContent>
                </ModalContentContainer>
            </ModalWrapper>
        </div>
    );
}

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImgContainer = styled.div`
    width: 480px;
    height: 100%;
    position: relative;
    display: flex;
`;

const CloseContainer: any = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #282828;
    width: 480px;
    padding: 15px;
    border-radius: 0 0 15px 15px;
    color: #ffffff;
`;

const Close: any = styled.span`
    cursor: pointer;
`;

const ModalWrapper: any = styled.div`
    box-sizing: border-box;
    display: ${(props: any) => (props.$visibled ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1300;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay: any = styled.div`
    box-sizing: border-box;
    display: ${(props: any) => (props.$visibled ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1299;
`;

const ModalContentContainer: any = styled.div`
    box-sizing: border-box;
    position: relative;
    max-width: 480px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;

export default React.memo(Modal);
