describe('Validation', function() {
    afterEach(function() {
        Validator.clear();
    });

    describe('when doing verification', function () {
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
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '', error: 'FieldA不能为空'});
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
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '123-456', error: 'FieldA should match ddd-dddd'});
                expect(e.reason).toEqual('FieldA should match ddd-dddd');
            }
        });

        it('throws error base on functional rule', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(new Rule(function(v) {
                    return (v instanceof Array) && v.length > 0;
                }, '{{field}} should contains more than 1 element'))
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: []
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: [], error: 'FieldA should contains more than 1 element'});
                expect(e.reason).toEqual('FieldA should contains more than 1 element');
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
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(2);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '', error: 'FieldA不能为空'});
                expect(e.details[1]).toEqual({field: 'fieldB', value: '', error: 'FieldB不能为空'});
                expect(e.reason).toEqual('FieldA不能为空, FieldB不能为空');
            }
        });
    });

    describe('build-in rules', function () {
        it('verifies not empty array rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.notEmptyArray)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: []
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: [], error: 'FieldA不能为空'});
                expect(e.reason).toEqual('FieldA不能为空');
            }
        });
        it('verifies tel rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.telephone)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: '123'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '123', error: 'FieldA格式有误'});
                expect(e.reason).toEqual('FieldA格式有误');
            }
        });

        it('verifies positive number rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.positiveNumber)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: 0
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 0, error: 'FieldA应为正数'});
                expect(e.reason).toEqual('FieldA应为正数');
            }
        });

        it('verifies email rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('email').attachRule(Rule.email)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: 'xxx'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 'xxx', error: 'email格式有误'});
                expect(e.reason).toEqual('email格式有误');
            }
        });

        it('verifies password rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('password').attachRule(Rule.password)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: 'abcdefgh'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 'abcdefgh', error: 'password至少8位，包含至少一个数字和字母'});
                expect(e.reason).toEqual('password至少8位，包含至少一个数字和字母');
            }
        });

        it('verifies password confirm rule', function () {
            Validator('test-verify', {
                fieldA: new Validation('passwordConfirm').attachRule(Rule.passwordConfirm)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: ['abcdefgh1', 'abcdefgh2']
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: ['abcdefgh1', 'abcdefgh2'], error: 'passwordConfirm不一致'});
                expect(e.reason).toEqual('passwordConfirm不一致');
            }
        });
    });

    describe('when verifying basic type(String)', function () {
        beforeEach(function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be(String))
            });
        });

        it('allows undefined', function() {
            try {
                Validator.verify('test-verify', {});
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows String', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 'String'
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('throws error for Number', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 1
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 1, error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });
    });

    describe('when verifying advanced class(Date)', function() {
        beforeEach(function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be(Date))
            });
        });

        it('allows undefined', function() {
            try {
                Validator.verify('test-verify', {});
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows Date', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: new Date()
                });
            } catch(e) {
            expect('no error').toBe('error');
            }
        });

        it('throws error for String', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 'not a date'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 'not a date', error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });
    });

    describe('when verifying Array(String) type', function() {
        beforeEach(function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be([String]))
            });
        });

        it('throw errors for undefined', function() {

            try {
                Validator.verify('test-verify', {});
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: undefined, error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });

        it('allows empty []', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: []
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows ["a"]', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: ['a']
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('throw errors for [Number]', function() {

            try {
                Validator.verify('test-verify', {
                    fieldA: [1]
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-scenario-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: [1], error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });


        it('allows ["a"] and ["b"]', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: ['a']
                });
                Validator.verify('test-verify', {
                    fieldA: ['b']
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });
    });

    describe('verifyRule', function () {
        it('allows no error', function () {
            try {
                Validator.verify(new Rule(function() {return 'no error';}));
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('deny error', function () {
            try {
                Validator.verify(new Rule(function() {return !'error';}));
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-rule');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({error: '验证错误'});
                expect(e.reason).toEqual('验证错误');
            }
        });

        it('deny error with custom message', function () {
            try {
                Validator.verify(new Rule(function() {return !'error';}, 'Go away!'));
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-rule');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({error: 'Go away!'});
                expect(e.reason).toEqual('Go away!');
            }
        });
    });
});
