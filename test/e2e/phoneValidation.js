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
            client.clearValue('input[name=phone]');
            client.setValue('input[name=phone]', 'test@test.ru');
            client.assert.cssClassNotPresent('input[name=phone]', 'error');
            client.click('#submitButton');
            client.assert.cssClassPresent('input[name=phone]', 'error');
        });

        it("Must disappear", function (client) {
            client.clearValue('input[name=phone]');
            client.setValue('input[name=phone]', '+7(111)111-11-11');
            client.click('#submitButton');
            client.assert.cssClassNotPresent('input[name=phone]', 'error');
        })
    });

    describe('Test phones: ', function () {
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

        it("Correct phone", function (client) {
            const phoneCorrect = [
                '+7(111)111-11-11', "+7(355)550-00-00",//30
                "+7(000)000-00-00"
            ];
            for (let i = 0; i < phoneCorrect.length; i++) {
                client.clearValue('input[name=phone]');
                client.setValue('input[name=phone]', phoneCorrect[i]);
                client.click('#submitButton');
                client.assert.cssClassNotPresent('input[name=phone]', 'error');
            }
        });

        it("Incorrect phones", function (client) {
            const phoneIncorrect = [
                '+8(911)000-00-00', '8+7(111)111-11-11', '+7(999)999-99-99',
                '+7(999)-999-99-99', '+7(000)000-00-00-', '7(000)000-00-00'
            ];
            for (let i = 0; i < phoneIncorrect.length; i++) {
                client.clearValue('input[name=phone]');
                client.setValue('input[name=phone]', phoneIncorrect[i]);
                client.click('#submitButton');
                client.assert.cssClassPresent('input[name=phone]', 'error');
            }
        })

    });

});


