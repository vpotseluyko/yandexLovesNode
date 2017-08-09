const {expect} = require('chai');

describe("Check form methods", function () {

    before(function (client, done) {
        client
            .url('http://localhost/')
            .pause(1000, function () {
                done()
            });
    });

    after(function (client, done) {
        client.end(function () {
            done();
        })
    });

    it('getData method', function (client) {
        client.setValue('input[name=fio]', '1 2 3');
        client.setValue('input[name=email]', '123@ya.ru');
        client.setValue('input[name=phone]', '+7(911)111-80-83');
        client.execute("return window.myForm.getData()", [], function (response) {
            expect(response.value).to.be.an('object');
            expect(response.value.fio).to.be.equal('1 2 3');
            expect(response.value.email).to.be.equal('123@ya.ru');
            expect(response.value.phone).to.be.equal('+7(911)111-80-83');
        });
    });

    it('setData method', function (client) {
        client.execute(
            "window.myForm.setData(" +
            "{email: '12345@ya.ru', " +
            "fio: '1 2 34', " +
            "phone: '+7(901)111-80-83'})", []);
        client.getValue('input[name=fio]', function (result) {
            this.assert.equal(result.value, '1 2 34')
        });
        client.getValue('input[name=email]', function (result) {
            this.assert.equal(result.value, '12345@ya.ru')
        });
        client.getValue('input[name=phone]', function (result) {
            this.assert.equal(result.value, '+7(901)111-80-83')
        });
        client.clearValue('input[name=fio]');
        client.clearValue('input[name=email]');
        client.clearValue('input[name=phone]');

    });

    it("submit method", function (client) {
        client.setValue('input[name=fio]', 'One two three');
        client.setValue('input[name=email]', 'vp@yandex.ru');
        client.setValue('input[name=phone]', '+7(000)000-00-00');
        client.execute(
            "document.querySelector('form')" +
            ".setAttribute('action', 'api/success.json')"
        );
        client.execute("window.myForm.submit()", []);
        client.assert.cssClassPresent('#resultContainer', 'success');
        client.getText('#resultContainer', function (res) {
            this.assert.equal(res.value, 'Success');
        });
        client.execute(
            "document.querySelector('form')" +
            ".setAttribute('action', 'api/error.json')"
        );
        client.execute("window.myForm.submit()", []);
        client.assert.cssClassPresent('#resultContainer', 'error');
        client.getText('#resultContainer', function (res) {
            this.assert.equal(res.value, 'Server error 500');
        });
        client.execute(
            "document.querySelector('form')" +
            ".setAttribute('action', 'api/timeout.json')"
        );
        client.execute("window.myForm.submit()", []);
        client.assert.cssClassPresent('#resultContainer', 'progress');
        client.pause(2000);
        client.assert.cssClassPresent('#resultContainer', 'progress');
        client.getAttribute('#submitButton', 'disabled', function (res) {
            expect(res.value).to.be.equal('true');
        });
        client.execute(
            "document.querySelector('form')" +
            ".setAttribute('action', 'api/success.json')"
        );
        client.pause(2000);
        client.assert.cssClassPresent('#resultContainer', 'success');
        client.getText('#resultContainer', function (res) {
            this.assert.equal(res.value, 'Success');
        });
        client.clearValue('input[name=fio]');
        client.clearValue('input[name=email]');
        client.clearValue('input[name=phone]');

    });

    it('validate: success', function (client) {
        client.setValue('input[name=fio]', 'One two three');
        client.setValue('input[name=email]', 'vp@ya.ru');
        client.setValue('input[name=phone]', '+7(000)000-00-00');
        client.execute('return window.myForm.validate()', [], function (res) {
            expect(res.value.isValid, true);
            expect(res.value.errorFields.length, 1);
        })
    });

    it('validate: error', function (client) {
        client.setValue('input[name=fio]', 'One two three fout');
        client.setValue('input[name=email]', 'vp@ya.ru2');
        client.setValue('input[name=phone]', '+7(000)0020-00-00');
        client.execute('return window.myForm.validate()', [], function (res) {
            expect(res.value.isValid).to.be.equal(false);
            expect(res.value.errorFields).to.be.an('array');
            expect(res.value.errorFields.length).to.be.equal(3);
            expect(JSON.stringify(res.value.errorFields)).to.be.equal(
                JSON.stringify(['email', 'fio', 'phone']));
        })
    })

});
