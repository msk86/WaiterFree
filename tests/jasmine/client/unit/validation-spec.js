describe('Validation', function() {
    afterEach(function() {
        Validator.clear();
    });

    it('not throws error if pass the validation', function() {
        Validator('test-verify', {
            fieldA: new Validation('FieldA').attachRule(Rule.notEmpty)
        });

        try {
            Validator.verify('test-verify', {
                fieldA: 'Not Empty'
            });
        } catch(e) {
            expect('no error').toBe('error');
        }
    });

    it('throws error base on not empty rule', function() {
        Validator('test-verify', {
            fieldA: new Validation('FieldA').attachRule(Rule.notEmpty)
        });

        try {
            Validator.verify('test-verify', {
                fieldA: ''
            });
            expect('error').toBe('no error');
        } catch(e) {
            expect(e.error).toEqual('validation-test-verify');
            expect(e.details.length).toEqual(1);
            expect(e.details[0]).toEqual('FieldA不能为空');
            expect(e.reason).toEqual('FieldA不能为空');
        }
    });

    it('throws error base on customised rule', function() {
        Validator('test-verify', {
            fieldA: new Validation('FieldA').attachRule(new Rule(/\d{3}-\d{4}/, '{{field}} should match ddd-dddd'))
        });

        try {
            Validator.verify('test-verify', {
                fieldA: '123-456'
            });
            expect('error').toBe('no error');
        } catch(e) {
            expect(e.error).toEqual('validation-test-verify');
            expect(e.details.length).toEqual(1);
            expect(e.details[0]).toEqual('FieldA should match ddd-dddd');
            expect(e.reason).toEqual('FieldA should match ddd-dddd');
        }
    });

    it('throws error base on multiple validations', function() {
        Validator('test-verify', {
            fieldA: new Validation('FieldA').attachRule(Rule.notEmpty),
            fieldB: new Validation('FieldB').attachRule(Rule.notEmpty)
        });

        try {
            Validator.verify('test-verify', {
                fieldA: '', fieldB: ''
            });
            expect('error').toBe('no error');
        } catch(e) {
            expect(e.error).toEqual('validation-test-verify');
            expect(e.details.length).toEqual(2);
            expect(e.details[0]).toEqual('FieldA不能为空');
            expect(e.details[1]).toEqual('FieldB不能为空');
            expect(e.reason).toEqual('FieldA不能为空, FieldB不能为空');
        }
    });
});
