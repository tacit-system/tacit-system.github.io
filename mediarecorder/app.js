(function (window) {
    if (!window.enlizt) window.enlizt = {};

    var user = {},
        status = null,
        statuses = [],
        finished = false,
        position = enlizt.config ? (enlizt.config.id || 'resume') : null,
        qualification = null,
        disabledOnly = false,
        withEducationOnly = false,
        requiredWorkExperience = null,
        requiredCountry = null,
        category = null,
        controllers = {},
        $breadcrumb = null,
        $content = null,
        $modal = null,
        putDetails = null,
        isMockup = window.hasOwnProperty('enliztMockupData'),
        surveyData = {},
        isPublicAnnouncement = false;

    if (!position) position = (window.location.pathname.indexOf('/resume') === 0) ? 'resume' : window.location.pathname.split('/')[2];
    enlizt.language = ('<%=LANG_PT%>').slice(5).toLowerCase();

    enlizt.temp = function(data) {
        if (data == 'introduction') enlizt.go('introduction');
        else {
            data.isTest = true;
            prepareQualification(data);
        }
    };

    enlizt.mockup = function(status, qIndex) {
        if (status == 'answer_questions') {
            if (!qIndex) qIndex = 0;
            enliztMockupData.qualification.questionnaireIndex = qIndex;
            enliztMockupData.qualification.questionnaire = enliztMockupData.qualification.questionnaires[qIndex];
            enliztMockupData.qualification.questionnaire.itemsTotal = [];
            enliztMockupData.qualification.questionnaires.forEach(function(q, i) {
                q.id = i;
                enliztMockupData.qualification.questionnaire.itemsTotal.push(i);
            });
        }
        enliztMockupData.qualification.status = status;
        prepareQualification(enliztMockupData);
    };

    enlizt.getUser = function() {
        return user;
    };

    enlizt.getPosition = function() {
        return position;
    };

    enlizt.isDisabledOny = function() {
        return disabledOnly;
    };

    enlizt.withEducationOnly = function() {
        return withEducationOnly;
    };

    enlizt.requiredWorkExperience = function() {
        return requiredWorkExperience;
    };
    enlizt.requiredCountry = function() {
        return requiredCountry;
    };

    enlizt.category = function() {
        return category;
    };

    // Controllers registering
    enlizt.controller = function(name, run) {
        controllers[name] = run;
        return this;
    };

    enlizt.getStatuses = function() {
        return statuses;
    };

    enlizt.getIsPublicAnnouncement = function() {
        return isPublicAnnouncement;
    };

    enlizt.isFinished = function() {
        return finished;
    };

    enlizt.go = function(data, introduction) {
        var controller = (introduction) ? 'introduction' : data.status;
        if (controllers.hasOwnProperty(controller)) {
            qualification = data;
            controllers[controller](data);
        }
    };

    enlizt.setContent = function(html, keepSpinner) {
        if ($content) {
            $('body').scrollTop(0);
            $content.html(html);
            $content.find(checkEmptyValues).each(checkEmpty);
            if (!keepSpinner) enlizt.hideSpinner();
        }
    };

    enlizt.bootstrap = function() {
        var $loginSignup = $('#login-signup'),
            $loginVerify = $('#login-verify'),
            $loginPassword = $('#login-password');

        // $('#phone').parent().int_phone();
        $('#login-form-group').find('input[type="text"], input[type="email"]').on('blur', function() {
            this.value = this.value.trim();
        });
        $('#login-form-group').find('input[type="text"], input[type="email"], #newpassword').on('blur', function() {
            this.value = this.value.trim();
        });

        var showLoginForm = function(email, type) {
            $loginSignup.attr('style', 'display:none;');
            $loginVerify.attr('style', 'display:none;');
            $loginPassword.attr('style', 'display:none;');

            if (!email || !type) {
                $loginVerify.removeAttr('style');
            } else {
                $loginVerify.attr('style', 'display:none;');
                $loginPassword.removeAttr('style').find('#email-registered').val(email);
                $loginPassword.find('#password').focus();
            }

            $('#forgot-password').off().on('click',function (e) {
                e.preventDefault();
                enlizt.showSpinner();
                var request = $.post('<%=/perfil/alterar-senha%>', {
                    email: email,
                    subject: 'Plooral - <%=Alterar Senha%>',
                    link: window.location.origin + '<%=/perfil/alterar-senha%>/'
                });
                request.done(function () {
                    enlizt.showModal('<%=As instruções para alteração da sua senha foram enviados por e-mail%> (' + email + ')');
                }).fail(function () {
                    enlizt.showModal('<%=Erro de conexão com servidor. Tente novamente mais tarde.%>');
                });
            });
        };


        var verifyEmail = function(el) {
            el.value = el.value.toLowerCase();
            $(el).siblings('.highlight').removeAttr('data-content');
            var email = el.value.toLowerCase();

            if (email && !$(el).hasClass('input-error')) {
                $.get('/verify?email=' + email).done(function (res) {
                    showLoginForm(email, res);
                }).fail(function(res) {
                    if (res.status && res.status == 403) {
                        enlizt.showModal(email + " <%=é usuário corporativo Plooral e por isso não pode ser candidato.%>");
                        el.value = '';
                    } else if (res.status && res.status == 400) {
                        enlizt.showModal(email + " <%=não é um e-mail válido%>.");
                        el.value = '';
                    } else {
                        // $login.removeAttr('style').find('#email').val(email);
                        $loginVerify.attr('style', 'display:none;');
                        $loginSignup.removeAttr('style').find('#email').val(email);
                        // $loginSignup.find('#confirm').focus();
                        $loginSignup.find('[type=tel]').focus();
                    }
                    $('#login-password').attr('style', 'display:none;');
                    $('#login-password-social').attr('style', 'display:none;');
                });
            }
        };

        var doLogin = function(values, showError) {
            enlizt.showSpinner();
            var request = $.post('/vagas/' + position + '/selecao' + window.location.search, values);
            request.done(function(data) {
                if (data.blocked) {
                    return enlizt.showModal('<%=Você não pode se candidatar a essa vaga.%>');
                }
                if (window.ga) ga('send', 'event', 'enlizt_application', 'start', data.qualification.status);
                prepareQualification(data);
            }).fail(function(data) {
                if (showError) {
                    if (data.responseText == 'canceled') enlizt.showModal('<%=Sua candidatura nesta vaga foi cancelada.%>');
                    else if (data.responseText == 'Issue validating candidate status') setError();
                    else if (data.status == 409) enlizt.showModal('<%=Esta vaga não está recebendo novos candidatos no momento%>.');
                    else if (data.status == 401) enlizt.showModal('<%=Senha incorreta.%>');
                    else if (data.status == 429) enlizt.showModal('<%=Usuário temporariamente bloqueado, por favor entre em contato com o suporte.%>');
                    else if (data.status == 410) {
                        if (!$modal) {
                            var $m = $('#front-layer');
                            $m.on('click', '.close', function() {
                                window.location = '//' + window.location.host;
                            });
                        }
                        $m.find('.modal-content').text('<%=Infelizmente esta vaga não está mais disponível.%>');
                        enlizt.hideSpinner();
                        $m.addClass('active');
                    } else enlizt.showModal('<%=Não foi possível acessar a candidatura, por favor entre o contato com o suporte%>');
                }
                else setError();
            });
        };

        $('#login-form-group input[type="email"]:not(#confirm)').blur(function() {
            verifyEmail(this);
        });

        $('#confirm').blur(function() {
            if (!this.value || this.value != $('#email').val()) $(this).addClass('input-error').attr('data-error', 'invalid-email-match');
        });

        $('form:not(#ticket-form,.special-form)').submit(function(e) {
            e.preventDefault();
            var form = this.id;

            if (form == 'login-verify') {
                $loginVerify.find('#email-verify').blur();
            } else {
                var $form = $(this),
                    $formValues = $form.find('input');
                if (form == 'login-signup') {
                    if ($formValues.hasClass('input-error')) return;
                    $formValues.eq(1).val($formValues.eq(1).val().toLowerCase());
                    // $formValues.eq(2).val(($formValues.eq(2).val()).replace(/\D/g,''));
                }
                doLogin($form.serialize(), !!form);
            }
        });


        // Validations
        var checkNumber = function() {
            if (this.checkValidity()) $(this).removeClass('input-error').removeAttr('data-error');
            else $(this).addClass('input-error').attr('data-error', 'invalid-number');
        };
        var checkEmail = function() {
            if (this.checkValidity()) $(this).removeClass('input-error').removeAttr('data-error');
            else $(this).addClass('input-error').attr('data-error', 'invalid-email');
        };

        $(document).on('blur', checkEmptyValues, checkEmpty)
                                  .on('blur', 'input[type="email"]', checkEmail)
                                  .on('focus', 'input[type="tel"]', function() { this.value = this.value.replace(/\D/g,''); })
                                  .on('blur', 'input[type="number"]', checkNumber);

        var query = location.search.split('&');
        if (query.length > 1) {
            var queryEmail = null,
                cancelCode = null;
            for (var i = 0, l = query.length; i < l; i++) {
                if (query[i].indexOf('e=') === 0) queryEmail = query[i].slice(2);
                if (query[i].indexOf('c=') === 0) cancelCode = query[i].slice(2);
            }
            if (queryEmail) {
                var url = location.href.replace('&e=' + queryEmail, '').replace('?e=' + queryEmail, '');
                window.history.pushState('', document.title, url);
                queryEmail = atob(queryEmail);
                showLoginForm(queryEmail, {login: 0});
            }
            if (cancelCode) {
                enlizt.showSpinner();
                var request = $.ajax({
                    url: '/vagas/' + position + '/selecao/' + cancelCode,
                    type: 'DELETE',
                    dataType: 'json'
                });
                request.always(function() {
                    $('#main-content header h1').text('<%=Fica para próxima então...%>');
                    var html = '<div class="text-container">' +
                               '  <p>' +
                               '    <%=Queremos combinar de modo efetivo empresa-colaborador; que gastemos nosso tempo com alguém que case com nossa cultura, ao mesmo tempo que o candidato gaste seu tempo com um trabalho que case com seu projeto de vida.%>' +
                               '</p>' +
                               '  <p><%=Infelizmente esta não era a vaga ideal para você. Talvez em uma outra oportunidade.%></p>' +
                               '  <div class="call-to-action"><button onclick="window.location.href=\'/\'"><%=Fechar%></button></div>' +
                               '</div>';
                    $('section.frame-content').html(html);
                    enlizt.hideSpinner();
                }).fail(setError);
            }
        }

        if (isMockup) {
            window.scrollTo(0,0);
            enlizt.mockup(enliztMockupData.qualification.status);
            $('body').addClass('no-scroll mockup-app');
            $('.intro-overlay').click(function() {
                $('body').removeClass('no-scroll');
                $(this).remove();
            });
            setTimeout(function() {window.scrollTo(0,0);}, 300);
            return;
        }

        if (document.cookie && document.cookie.includes('enlizt_t=')) {
            var match = document.cookie.match(new RegExp('(^| )enlizt_t=([^;]+)'));
            var newToken = match[2];
            document.cookie = "enlizt_t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            doLogin({token: newToken}, true);
        }
    };

    var checkEmptyValues = 'input[type="text"], input[type="email"], [type="tel"], input[type="password"], input[type="url"], textarea';
    var checkEmpty = function() {
        var tmpval = $(this).val();
        if(tmpval == '') $(this).addClass('input-empty');
        else $(this).removeClass('input-empty');
    };
    enlizt.checkEmptyValues = checkEmptyValues;
    enlizt.checkEmpty = checkEmpty;

    enlizt.showSpinner = function(info) {
        enliztShowSpinner(info);
    };

    enlizt.hideSpinner = function() {
        enliztHideSpinner();
    };

    enlizt.spinnerInfo = function(info) {
        enliztSpinnerInfo(info);
    };

    enlizt.showModal = function(message, richContent, noClose) {
        if (!$modal) {
            $modal = $('#front-layer');
            $modal.on('click', '.close', enlizt.hideModal);
        }
        if (noClose) $modal.find('button.close').hide();
        if (richContent) $modal.find('.modal-content').html(message);
        else $modal.find('.modal-content').text(message);
        enlizt.hideSpinner();
        $modal.addClass('active');
    };

    enlizt.hideModal = function() {
        $modal.removeClass('active');
        setTimeout(function() {
            $modal.find('.modal-content').html('');
            $modal.find('button.close').show();    
        }, 1000);
    };

    enlizt.setBreadcrumb = function(status) {
        $breadcrumb.removeClass('selected').filter('.' + status).addClass('selected');
    };

    enlizt.putDetailsandQualification = function(data) {
        putDetails = data;
        putQualification();
    };

    enlizt.cancelApplication = function(noFeedback) {
        if (isMockup) {
            var html = '<div class="text-container">' +
                       '  <h2><%=Fica para próxima então...%></h2>' +
                       '  <p><%=Atenção, ao desistir da candidatura, você não poderá mais candidatar-se novamente a esta vaga.%></p>' +
                       '  <p><%=Por que você não está mais interessado?%></p>';
            html += '<textarea id="feedback" class="open-question"></textarea>';
            html += '<div class="call-to-action"><button id="submit-feedback" class="button"><%=Continuar%></button></div></div>';
            $('section.frame-content').html(html);
            $('#submit-feedback').click(function() {
              window.location = '/';
            });
            return;
        }

        if (window.ga) ga('send', 'event', 'enlizt_application', 'cancel', status);
        enlizt.showSpinner();
        var request = $.ajax({
            url: '/vagas/' + position + '/selecao',
            type: 'DELETE',
            headers: {'x-access-token': user.token},
            dataType: 'json'
        });
        request.always(function() {
            if (noFeedback) {
                window.location = '/';
                return;
            }
            var html = '<div class="text-container">' +
                       '  <h2><%=Fica para próxima então...%></h2>' +
                       '  <p><%=Atenção, ao desistir da candidatura, você não poderá mais candidatar-se novamente a esta vaga.%></p>' +
                       '  <p><%=Por que você não está mais interessado?%></p>';
            html += '<textarea id="feedback" class="open-question"></textarea>';
            html += '<div class="call-to-action"><button id="submit-feedback" class="button"><%=Continuar%></button></div></div>';
            $('section.frame-content').html(html);
            enlizt.hideSpinner();
            $('#submit-feedback').click(function() {
                var f = $('#feedback').val();
                if (f) {
                    var feedback = $.ajax({
                        url: '/vagas/' + position + '/feedback',
                        type: 'POST',
                        headers: {'x-access-token': user.token},
                        data: {feedback: f}
                    });
                    feedback.always(function() {
                        window.location = '/';
                    }).fail(setError);
                } else {
                    window.location = '/';
                }
            });
        }).fail(setError);
    };

    enlizt.getSurvey = function() {
        return surveyData;
    };

    var processSurvey = function() {
        surveyData.gender = $('input[name="gender"]:checked').val();
        surveyData.race = $('input[name="race"]:checked').val();
        surveyData.veteran = $('input[name="veteran"]:checked').val();
        surveyData.disability = $('input[name="disability"]:checked').val();
    };

    var makeProfile = function() {
        var languages = [];
        $('.profile-languages').find('.data-list li').each(function() {
            var data = JSON.parse(unescape(this.getAttribute('data-values')));
            languages.push({code: data[0], proficiency: data[1]});
        });

        var cats = {};
        var categories = [];
        $('.profile-categories select option').each(function() { if (this.value) cats[this.value.toLocaleLowerCase()] = this.dataset.id; });
        $('.profile-categories').find('.tag-list li').each(function() {
            categories.push(cats[this.innerText]);
        });

        var profile = {
            // filter: 'personal-details',
            filter: 'personal-details,socialLinks,education,languages,skills,categories,work-experience',
            personalDetails: {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                phone: $('#phone').val(),
                dateOfBirth: ($('#dateOfBirth').val() && $('#dateOfBirth').val() !== 'undefined') ? $('#dateOfBirth').val() : '',
                location: $('#location').val(),
                locationId: $('#location').attr('data-id'),
                title: $('#title').val(),
                description: $('#description').val(),
                isDisabledPerson: $('#isDisabledPerson').is(':checked'),
                disability: $('#disability').val(),
                specialAdaptationNeeded: $('#specialAdaptationNeeded').val(),
                medicalReportICD: $('#medicalReportICD').val(),
                region: $('#region').val()
            },
            socialLinks:{
                github: $('#socialLinks-github').val(),
                twitter: $('#socialLinks-twitter').val(),
                behance: $('#socialLinks-behance').val(),
                dribbble: $('#socialLinks-dribbble').val(),
                linkedin: $('#socialLinks-linkedin').val(),
                facebook: $('#socialLinks-facebook').val(),
                instagram: $('#socialLinks-instagram').val(),
                tiktok: $('#socialLinks-tiktok').val(),
                blog: $('#socialLinks-blog').val(),
                site: $('#socialLinks-site').val(),
            },
            workExperience:  $.makeArray($('.profile-workexperience').find('.data-list li').map(function() {
                var data = JSON.parse(unescape(this.getAttribute('data-values')));
                var work = {
                    companyName: data[0],
                    title: data[1],
                    description: data[2],
                    periodFrom: data[3],
                    periodTo: data[4],
                    isCurrentWork: data[5]
                };
                if (data.length > 6) work.id = data[6];
                return work;
            })),
            education: $.makeArray($('.profile-education').find('.data-list li').map(function() {
                var data = JSON.parse(unescape(this.getAttribute('data-values')));
                var education = {
                    school: (data[0]).replace('&nbsp;', ' '),
                    course: data[1],
                    periodFrom: data[2],
                    periodTo: data[3],
                    isStudying: data[4],
                    highlight: false
                };
                if (education.length > 6) education.id = data[6];
                return education;
            })),
            categories: categories,
            skills: $.makeArray($('.profile-skills').find('.tag-list li').map(function() { return this.innerText; })),
            languages: languages,
            active: qualification.profile.active
        };

        if (profile.education.length == 0) delete profile.education;
        // else profile.filter += ',education';
        if (Object.keys(profile.languages).length == 0) delete profile.languages;
        // else profile.filter += ',languages';
        if (profile.skills.length == 0) delete profile.skills;
        // else profile.filter += ',skills';
        if (profile.categories.length == 0) delete profile.categories;
        // else profile.filter += ',categories';
        if (profile.workExperience.length == 0) delete profile.workExperience;
        // else profile.filter += ',work-experience';

        return profile;
    };

    var putQualification = function() {
        if (isMockup) {
            if (status == 'answer_questions') {
                var qIndex = enliztMockupData.qualification.questionnaireIndex;
                if (qIndex + 1 < enliztMockupData.qualification.questionnaires.length) {
                    enlizt.mockup('answer_questions', qIndex + 1);
                    itemsTotal;
                    return;
                }
            }
            var currentIndex = enliztMockupData.stages.indexOf(status);
            var newStatus = (enliztMockupData.stages.length == currentIndex + 1) ? 'no_filter' : enliztMockupData.stages[currentIndex + 1];
            enlizt.mockup(newStatus);
            return;
        }

        var data = {
            status: status
        };
        if (status == 'make_video') {
            data.video = putDetails.video;
            data.skipped = putDetails.skipped;
        }
        else if (status == 'login') data.login = putDetails;
        else if (status == 'profile') {
            var $img = $('#avatar').find('img');
            if ($img.attr('data-changed')) {
                $.ajax({
                    url: '/store/images/avatar',
                    type: 'POST',
                    headers: {'x-access-token': user.token},
                    data: {file: $img.attr('src')}
                });
            }
            
            var $addons = $('*[id*=addon-]');
            if ($addons && $addons.length) {
                data.addons = {};
                $addons.each(function() {
                    var id = this.id.replace('addon-', '');
                    var answer = this.value;
                    if (this.tagName == 'DIV') {
                        answer = $.makeArray($(this).find('input[type=checkbox]:checked').map(function(i, e) {
                           return e.id.replace('addon_alternative-', '');
                        }));
                    }
                    data.addons[id] = answer;
                });
                
            } 
            data.profile = makeProfile();
            user.active = data.profile.active;
            data.finish = finished;
            processSurvey(); // EEOC
        }

        if (status != 'answer_questions') enlizt.showSpinner();

        var settings = {
            url: '/vagas/' + position + '/qualificacao',
            type: 'PUT',
            headers: {'x-access-token': user.token},
            data: data,
            dataType:'json'
        };

        if (status == 'answer_questions') {
            var formData = new FormData();
            if (putDetails.files) {
                for (var file in putDetails.files) {
                    formData.append(file, putDetails.files[file], putDetails.files[file].name);
                }    
            }
            formData.append('status', status);
            formData.append('answers', JSON.stringify({
                items: putDetails.items,
                time: putDetails.time,
                id: putDetails.id
            }));
            settings.data = formData;
            settings.processData = false;
            settings.contentType = false;
            settings.cache = false;
        } else settings.dataType = 'json';

        $.ajax(settings).done(function(res) {
            status = res.qualification.status;
            enlizt.setBreadcrumb(status);
            enlizt.go(res.qualification);
            putDetails = null;
            if (window.ga) ga('send', 'event', 'enlizt_application', 'next', res.qualification.status);
        }).fail(setError);
    };

    var prepareQualification = function(data) {
        var firstStatus = 'profile';
        isPublicAnnouncement = data.position && data.position.isPublicAnnouncement;
        status = data.qualification.status;
        statuses = [];
        $content = $('<div class="text-container"></div>');
        $('section.frame-content').addClass('qualification').html($content);

        if (status === 'profile') {
            finished = data.finish === true;
        }

        if (status != 'no_filter') {
            user = {
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                phone: data.user.phone,
                token: data.token,
                answeredSurvey: data.user.answeredSurvey
            };

            var defaultBreadcrumb = '<ul id="breadcrumb"><li class="profile login"><%=dados pessoais%></li></ul>';

            var breadcrumb;
            if (finished) breadcrumb = defaultBreadcrumb;
            else {
                var job = data.position;
                disabledOnly = job.disabledOnly;
                requiredCountry = data.qualification.requiredCountry;
                withEducationOnly = job.withEducationOnly;
                requiredWorkExperience = job.requiredWorkExperience;
                category = job.category;
                job.video = (job.videos.company || job.videos.leadership || job.videos.position);

                if (job.video) {
                    firstStatus = 'watch_videos';
                    statuses.push('watch_videos');
                } else if (job.faq) firstStatus = 'read_faq';
                else firstStatus = 'profile';

                breadcrumb = '<ul id="breadcrumb">';
                breadcrumb += '<li class="watch_videos"><%=apresentação%></li>';
                if (job.faq) {
                    breadcrumb += '<li class="read_faq"><%=faq%></li>';
                    statuses.push('read_faq');
                }
                breadcrumb += '<li class="profile login"><%=dados pessoais%></li>';
                statuses.push('profile');
                if (job.questionnaires) {
                    breadcrumb += '<li class="answer_questions"><%=questionário%></li>';
                    statuses.push('answer_questions');
                }
                if (job.interview) {
                    breadcrumb += '<li class="make_video"><%=gravação%></li>';
                    statuses.push('make_video');
                }
                breadcrumb += '</ul>';
            }
            if (statuses.length === 1) breadcrumb = defaultBreadcrumb;

            var headerTitle = isMockup ? '<h1><span style="color: tomato">[PREVIEW]</span> <%=Aplicação para a Vaga%></h1>' : '<h1><%=Aplicação para a Vaga%></h1>';
            $('#main-content > header').html(headerTitle).append(breadcrumb);
            $breadcrumb = $('#breadcrumb li');
            enlizt.setBreadcrumb((!finished && status == firstStatus && statuses.length > 1) ? 'watch_videos' : status);
            if (isMockup) {
              $('#breadcrumb').on('click', function(e) {
                  enlizt.mockup(e.target.className.split(' ')[0]);
              });
            }

            $content.on('click', '.next', function(e) {
                e.preventDefault();
                var $slides = $content.find('.slide'),
                    $prevSlide = $slides.filter('.active').removeClass('active'),
                    index = $slides.index($prevSlide);
                $prevSlide.find('iframe').remove();
                $slides.eq(index + 1).addClass('active');
            });
            $content.on('click', '.confirm', function(e) {
                e.preventDefault();
                if (status == 'make_video') {
                    putDetails = {
                        video: { 
                            type: e.target.getAttribute('data-type'),
                            code: e.target.getAttribute('data-code')
                        }
                    };
                }
                putQualification();

            });
            $content.on('click', '.deny', function(e) {
                e.preventDefault();
                enlizt.cancelApplication();
            });
        }
        // $('#spacer').remove();
        $('#main-header').remove();
        $('#main-header-sticky').addClass('sticky');
        if (!finished && statuses.indexOf(status) == -1 && !data.isTest) {
            putQualification();
        } else {
            enlizt.go(data.qualification, (!finished && status == firstStatus));
        }
    };

    var setError = function(data) {
        if (status == 'login' && data.status == 401) {
            enlizt.showModal('<%=Senha incorreta.%>');
        } else if (status == 'login' && data.status == 429) {
            enlizt.showModal('<%=Usuário temporariamente bloqueado, por favor entre em contato com o suporte.%>');
        } else if (data.status == 403 && data.responseJSON && data.responseJSON.msg == 'Token has expired') {
            enlizt.showModal('<%=Sessão expirada. Verifique se você não está com uma candidatura aberta em outra aba do navegador (só é possível uma por vez).%>');
        } else if (data.status == 400 && data.responseJSON && data.responseJSON.msg == 'Negative Balance') {
            enlizt.showModal('<%=Infelizmente esta vaga não está mais disponível.%>');
        } else {
            enlizt.showModal('<%=Erro de conexão com servidor. Tente novamente mais tarde.%>');
        }
    };

    // show next-steps in card-view
    enlizt.frontLayer = function(html) {
        if (!html) return false;
        else {
            $('#front-layer').html(html);
            setTimeout( function() {
                $('#front-layer').addClass('active');
            }, 1000);
        }
    };
})(window);


(function ($) {
    $.sanitize = function(input) {
        if (input && (typeof input === 'string' || input instanceof String)) return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        else return '';
    };
})(jQuery);

(function($) {
    $.linkify = function(text) {
        if (text) {
            text = text.replace(
                /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
                function(url){
                    var full_url = url;
                    if (!full_url.match('^https?:\/\/')) {
                        full_url = 'http://' + full_url;
                    }
                    return '<a href="' + full_url + '" target="_blank">' + url + '</a>';
                }
            );
        }
        return text;
    };
})(jQuery);

(function ($) {
    $.loadcss = function(cssFile) {
        var found = false;
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if (document.styleSheets[i].href === cssFile) {
                found = true;
                break;
            }
        }
        if (!found) {
            if (document.createStyleSheet) {
                document.createStyleSheet(cssFile);
            } else {
                var html = $.parseHTML('<link href="' + cssFile  + '" rel="stylesheet" type="text/css">');
                $("head").append(html);
            }
        }
    };
})(jQuery);

$(function() {
    if (navigator.userAgent.match(/Mobi/)) {
        $('body').addClass('is-mobile');
    }
    enlizt.bootstrap();
});