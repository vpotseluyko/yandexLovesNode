describe("All layout elements must be on page", function () {

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

    it('Check all elements on page', function (client) {
        client.expect.element('#myForm').to.be.visible;
        client.expect.element('input[name=email]').to.be.visible;
        client.expect.element('input[name=fio]').to.be.visible;
        client.expect.element('input[name=phone]').to.be.visible;
        client.expect.element('#resultContainer').to.be.present;
        client.expect.element('#resultContainer').text.to.equal('');
        client.expect.element('#submitButton').to.be.visible;
        // check form specific details
        client.expect.element('form').to.have.attribute('action')
            .which.matches(/\.json$/);
    });

});