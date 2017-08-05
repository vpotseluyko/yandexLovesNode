const Validate = {

    /**
     * @param phone {string} like +7(%d{3})%d{3}-%d{2}-%d{2}$
     *                       where sum <= 30
     * @returns {boolean} or throws Exception
     */
    checkPhone(phone) {
        if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone)) {
            throw new Error('Формат телефона неверен')
        } else if (phone.match(/\d/g).reduce((a, b) => +a + +b, 0) > 30) {
            throw new Error("Сумма чисел больше 30")
        }
        return true;
    },

    /**
     * @param fio {string}
     * @returns {boolean}
     */
    checkFio(fio) {
        fio = fio.trim().replace(/\s+/g, ' ');
        // delete spaces from end and begin; del double spaces; split by space
        if (fio.split(' ').length !== 3) {
            throw new Error('ФИО должно состоять из трех слов')
        }
        return true;
    },

    /**
     * string
     * @param email
     * @returns {boolean}
     */
    checkEmail(email) {
        const allowedDomains = [
            'ya.ru', 'yandex.kz', 'yandex.ru',
            'yandex.ua', 'yandex.by', 'yandex.com'
        ];

        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                .test(email)) {
            throw new Error("Формат email неверен")
        }
        // check yandex zone
        if (!allowedDomains.includes(email.split('@')[1])) {
            throw new Error("Запрещенный домен")
        }
        return true;
    }
};

module.exports = Validate;