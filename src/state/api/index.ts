export function getTempData() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                uid: 123,
                userName: 'kenneth',
                email: 'pretty9967@naver.com'
            }
        ]);
    });
}
