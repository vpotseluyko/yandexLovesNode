describe("Fio validation tests: ", function () {

    describe("Error class must appear or disappear on error: ", function () {

        before(function (client, done) {
            client
                .url('http://localhost/')
                .pause(1000, function () {
                    done();
                });
        });

        after(function (client, done) {
            client.end(function () {
                done();
            })
        });

        it("Must appear", function (client) {
            client.clearValue('input[name=fio]');
            client.setValue('input[name=fio]', 'test@test.ru');
            client.assert.cssClassNotPresent('input[name=fio]', 'error');
            client.click('#submitButton');
            client.assert.cssClassPresent('input[name=fio]', 'error');
        });

        it("Must disappear", function (client) {
            client.clearValue('input[name=fio]');
            client.setValue('input[name=fio]', 'Имя Фамилия Слово');
            client.click('#submitButton');
            client.assert.cssClassNotPresent('input[name=fio]', 'error');
        })
    });

    describe('Test fios: ', function () {
        before(function (client, done) {
            client
                .url('http://localhost/')
                .pause(1000, function () {
                    done();
                });
        });

        after(function (client, done) {
            client.end(function () {
                done();
            })
        });

        it("Correct fio", function (client) {
            const fioCorrect = [
                '  AA       BB   CC  ', 'Фамилия Имя Отчество'
            ];
            for (let i = 0; i < fioCorrect.length; i++) {
                client.clearValue('input[name=fio]');
                client.setValue('input[name=fio]', fioCorrect[i]);
                client.click('#submitButton');
                client.assert.cssClassNotPresent('input[name=fio]', 'error');
            }
        });

        it("Incorrect fios", function (client) {
            const fioIncorrect = [
                "Два слова", "Это не три слова"
            ];

            for (let i = 0; i < fioIncorrect.length; i++) {
                client.clearValue('input[name=fio]');
                client.setValue('input[name=fio]', fioIncorrect[i]);
                client.click('#submitButton');
                client.assert.cssClassPresent('input[name=fio]', 'error');
            }
        })

    });

});
