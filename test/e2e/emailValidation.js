describe("Email validation tests: ", function () {

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
            client.clearValue('input[name=email]');
            client.setValue('input[name=email]', 'test@test.ru');
            client.assert.cssClassNotPresent('input[name=email]', 'error');
            client.click('#submitButton');
            client.assert.cssClassPresent('input[name=email]', 'error');
        });

        it("Must disappear", function (client) {
            client.clearValue('input[name=email]');
            client.setValue('input[name=email]', 'test@yandex.ru');
            client.click('#submitButton');
            client.assert.cssClassNotPresent('input[name=email]', 'error');
        })
    });

    describe('Test emails: ', function () {
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

        it("Correct domains zones", function (client) {
            const emailCorrect = [
                'ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by',
                'yandex.kz', 'yandex.com'
            ];
            for (let i = 0; i < emailCorrect.length; i++) {
                client.clearValue('input[name=email]');
                client.setValue('input[name=email]', `test@${emailCorrect[i]}`);
                client.click('#submitButton');
                client.assert.cssClassNotPresent('input[name=email]', 'error');
            }
        });

        it("Incorrect emails", function (client) {
            const emailsIncorrect = [
                '~?""""#@ya.ru', 'test@gmail.com', 'test@ya.ru111',
                'rbc.ru', '@ya.ru', 'ya.ru'
            ];

            for (let i = 0; i < emailsIncorrect.length; i++) {
                client.clearValue('input[name=email]');
                client.setValue('input[name=email]', emailsIncorrect[i]);
                client.click('#submitButton');
                client.assert.cssClassPresent('input[name=email]', 'error');
            }
        })

    });

});
