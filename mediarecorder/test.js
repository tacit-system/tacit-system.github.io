window.go = function(stage) {
    var watch_video = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "qualification": {
            "status": "watch_videos",
            "videos": {
                "leadership": {
                    "code": "Nzq9epS2b1A",
                    "url": "https://www.youtube.com/watch?v=Nzq9epS2b1A",
                    "type": "YouTube"
                },
                "company": {
                    "code": "AAgnQdiZFsQ",
                    "url": "https://www.youtube.com/watch?v=AAgnQdiZFsQ",
                    "type": "YouTube"
                },
                "position": {
                    "list": [{
                        "code": "0WWzgGyAH6Y",
                        "url": "https://www.youtube.com/watch?v=0WWzgGyAH6Y",
                        "type": "YouTube"    
                    }]
                }
            }
        },
        user: {
            firstName: "Teste22",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA3LTI5VDE5OjQyOjA4LjQxOFoiLCJpc3MiOiI1NWFmZjIxMDViYTdjODA1MjRmNTIzNjYiLCJyb2xlIjoiQ0FORElEQVRFIn0.fmKGRubU2mgE8C_sY7sY9BCynXe2CDi20fdVQZ2NxKs"
        }
    };



    var faq = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "qualification": {
            "status": "read_faq",
            "faq": [{
                "question": "faq1<strong>teste</strong>",
                "answer": "resposta faq1 https://www.google.com"
            }, {
                "question": "faq2",
                "answer": "resposta faq2"
            }, {
                "question": "faq3",
                "answer": "resposta faq3"
            }]
        },
        user: {
            firstName: "Teste22",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA3LTI5VDIwOjA4OjMzLjQyMloiLCJpc3MiOiI1NWFmZjcyMTViYTdjODA1MjRmNTIzNmQiLCJpbmZvIjoicGEkJC1mcmVlIiwicm9sZSI6IkNBTkRJREFURSJ9.gWwB1pWq5gHulfvLESCVoXBePlxhwN7wlrnhC9SfdI0"
        }
    };

    var quiz = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questionnaires": true,
            "interview": true
        },
        "qualification": {
            "status": "answer_questions",
            "questionnaire": {
                  "id": "ab094911-9a4a-11e8-a93b-b362e22354e7",
                  "title": "Sem pontuação",
                  "timeLimit": null,
                  "isScored": false,
                  "passingScore": null,
                  "items": [
                    {
                        "id": "ab094920-9a4a-11e8-a93b-b362e22354e8",
                        "title": "Envie uma imagemX",
                        "type": "upload",
                        "answer": null,
                        "image": null,
                        "alternatives": null
                      },  
                    {
                    "id": "ab09491f-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Java Persistence Query Language (JPQL) é uma linguagem de consulta que faz parte da especificação JPA. Considere uma aplicação em Java que usa JPA, na qual está definida uma classe de entidade denominada br.app.acme.Cliente.\n\nAlém disso, essa aplicação contém o trecho de código abaixo, que cria um objeto do tipo javax.persistence.Query, cuja referência é qry.\n\n\njavax.persistence.Query qry = entityManager.createQuery( \n        \"SELECT OBJECT(c) FROM br.app.acme.Cliente c \" + \n        \" WHERE c.uf = :uf\");\nqry.setParameter(\"uf\", \"Acre\");\n\n\nA expressão adequada para execução da consulta em JPQL representada pela referência qry é:",
                    "type": "link",
                    "answer": null,
                    "image": null,
                    "alternatives": null
                  }, {
                    "id": "ab094913-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Qual o nome da figura abaixo?",
                    "type": "paragraph",
                    "answer": null,
                    "image": "https://s3.amazonaws.com/enlizt-local-juliano/questionnaire_files/ba767fc1-9a41-11e8-8685-cd8f42af73fa.jpg",
                    "alternatives": null
                  }, {
                    "id": "ab094914-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Qual sua cor?",
                    "type": "multiple_choice",
                    "answer": null,
                    "image": null,
                    "alternatives": [{
                      "title": "preto",
                      "image": null
                    }, {
                      "title": "branco",
                      "image": null
                    }, {
                      "title": "azul",
                      "image": null
                    }]
                  }, {
                    "id": "ab094918-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Quais animais?",
                    "type": "checkboxes",
                    "answer": null,
                    "image": null,
                    "alternatives": [{
                      "title": "Cachorro",
                      "image": null
                    }, {
                      "title": "Gato",
                      "image": null
                    }, {
                      "title": "Boi",
                      "image": null
                    }, {
                      "title": "Galinha",
                      "image": null
                    }]
                  }, {
                    "id": "ab09491d-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Escreva um número",
                    "type": "number",
                    "answer": null,
                    "image": null,
                    "alternatives": null
                  }, {
                    "id": "ab09491e-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Selecione uma data",
                    "type": "date",
                    "answer": null,
                    "image": null,
                    "alternatives": null
                  }, {
                    "id": "ab094920-9a4a-11e8-a93b-b362e22354e7",
                    "title": "Envie uma imagem",
                    "type": "image",
                    "answer": null,
                    "image": null,
                    "alternatives": null
                  }],
                  "itemsTotal": [
                    "6d66df40-5c32-11ea-a472-f79134189fd0",
                    "ab094911-9a4a-11e8-a93b-b362e22354e7"
                  ],
                }
        },
        user: {
            firstName: "Teste22",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA3LTI5VDIwOjEyOjEzLjY4NVoiLCJpc3MiOiI1NWFmZjcyMTViYTdjODA1MjRmNTIzNmQiLCJpbmZvIjoicGEkJC1mcmVlIiwicm9sZSI6IkNBTkRJREFURSJ9.AoH3YYoCgrXyVtvUahysstdvbxJynaG42M06_OotHLQ"
        }

    };

    var record = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "qualification": {
            "status": "make_video",
            "about": "texto da\n entrevista <strong>com tag</strong><script>alert('oi');</script>"
        },
        user: {
            firstName: "Teste22",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "+55 48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA3LTI5VDE5OjQyOjA4LjQxOFoiLCJpc3MiOiI1NWFmZjIxMDViYTdjODA1MjRmNTIzNjYiLCJyb2xlIjoiQ0FORElEQVRFIn0.fmKGRubU2mgE8C_sY7sY9BCynXe2CDi20fdVQZ2NxKs"
        }
    };

    var profile = {
        "position": {
            "id": "55bf8b7d440c8c9d207be4a8",
            "category": {
                id: "ab7c9378-94f2-11e8-ad69-542696d4d8f1",
                name: "Artes e Design"
            },
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true,
            "disabledOnly": false,
            "withEducationOnly": false,
            "requiredWorkExperience": 3
        },
        "qualification": {
            "status": "profile",
            "profile": {
                "active": false
            }
        },
        user: {
            firstName: "Avatar",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "+55 48987654321"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA4LTE3VDE2OjQxOjI2Ljk5N1oiLCJpc3MiOiI1NWM4ZDQzNjg3NTI5ZWJmNjdiNjA3MjUiLCJyb2xlIjoiQ0FORElEQVRFIn0.Xd_E1HPCUE-6zlrKmP5X6r8v4EjdJwKYjHim261QO8M"
    };

    var login = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "qualification": {
            "status": "login",
            "login": 0
        },
        user: {
            firstName: "Genald",
            lastName: "Bri",
            email: "teste.ignore@mailinator.com",
            phone: "48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA4LTAzVDIwOjI1OjI2Ljc0MFoiLCJpc3MiOiI1NWI2ODgwNWMxYzQzY2RlN2JiYmNlMzMiLCJpbmZvIjoicGEkJC1mcmVlIiwicm9sZSI6IkNBTkRJREFURSJ9.9TzcOLavJBX4mRnXYLD_eTM4aamZ_ggPEK6WbyAoe-o"
        }
    };

    var profile2 = {
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "qualification": {
            "status": "profile",
            "profile": {
                "avatar": "https://enlizt.s3-sa-east-1.amazonaws.com/users/55b68805c1c43cde7bbbce33_128_avatar?nocache=1438026403581",
                "personalDetails": {
                    "firstName": "Genald",
                    "lastName": "Bri",
                    "phone": "48987654321",
                    "title": "Auxiliar Contábil",
                    "location": "São Paulo, SP",
                    "description": "Começando a carreira...",
                    "dateOfBirth": "1983-05-10T03:00:00.000Z"
                },
                "workExperience": [{
                    "id": "55b688844916abdd7bc18eec",
                    "companyName": "CONCREMAT",
                    "title": "Auxiliar Financeiro",
                    "location": "Santo André, SP",
                    "periodFrom": "2012-07-01T03:00:00.000Z",
                    "periodTo": "2013-02-01T02:00:00.000Z",
                    "isCurrentWork": false,
                    "description": "Meu primeiro emprego"
                }, {
                    "id": "55b688c34916abdd7bc18eed",
                    "companyName": "SUZANO PAPEL E CELULOSE",
                    "title": "Administrador de Contratos",
                    "location": "São Paulo, SP",
                    "periodFrom": "2013-12-01T02:00:00.000Z",
                    "periodTo": "2014-12-01T02:00:00.000Z",
                    "isCurrentWork": false,
                    "description": "Não sei bem o que eu fazia..."
                }],
                "education": [{
                    "id": "55b689074916abdd7bc18eee",
                    "school": "Universidade de São Paulo (USP)",
                    "course": "Administração",
                    "periodFrom": "2000-02-01T02:00:00.000Z",
                    "periodTo": "2004-02-01T02:00:00.000Z",
                    "isStudying": false
                }, {
                    "id": "55b68941c1c43cde7bbbce35",
                    "school": "Universidade Estadual de Campinas (UNICAMP)",
                    "course": "Mestrado",
                    "periodFrom": "2015-02-01T02:00:00.000Z",
                    "isStudying": true
                }],
                "skills": [
                    "Contabilidade",
                    "administração",
                    "WordPress",
                    "Excell"
                ],
                "languages": {
                    "54f0deec0ccef82f4c9262b9": "native_or_bilingual",
                    "54f0deec0ccef82f4c9262cb": "elementary",
                    "54f0deec0ccef82f4c9262cc": "elementary"
                },
                socialLinks: {
                    blog: 'https://testequalquer.com'
                },
                categories: ['5107bc36-997c-11e8-a736-12274f56a96a'],
                "active": true
            },
            "addons": [{
                "id": "a661ff64-0f04-4831-9b2d-5e11fa24eb12",
                "title": "Que bairro você mora?",
                "type": "text",
                "answer": "Resposta qualquer.",
              }, {
                "id": "79618010-0c46-4769-bad2-cccd4fe6c3c0",
                "title": "Qual a sua altura?",
                "type": "multiple_choice",
                "answer": "a013ae2e-67b0-4090-9cf1-016522e4e296",
                "alternatives": [{
                  "id": "65a40d65-e0b3-4ea3-b676-75ee0167593e",
                  "title": "Até 1,50 m"
                }, {
                  "id": "a013ae2e-67b0-4090-9cf1-016522e4e296",
                  "title": "Mais de 1,50 m"
                }]
              }, {
                "id": "7d77def6-7087-4d44-b8ef-39e09d4fdbc2",
                "title": "Quais cores você gosta?",
                "type": "checkboxes",
                "answer": [],
                "alternatives": [{
                  "id": "f76fc9de-fae2-4ec9-abdc-b7fb3673cf28",
                  "title": "Azul"
                }, {
                  "id": "a3c17f59-9c8c-4605-b5aa-cbf1f8be8e35",
                  "title": "Vermelho"
                }, {
                  "id": "80b220a1-7904-4c49-8732-886f69f52a4f",
                  "title": "Verde"
                }]
              }]
        },
        user: {
            firstName: "Avatar",
            lastName: "Teste",
            email: "teste.ignore@mailinator.com",
            phone: "48987654321",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA4LTE3VDE2OjQxOjI2Ljk5N1oiLCJpc3MiOiI1NWM4ZDQzNjg3NTI5ZWJmNjdiNjA3MjUiLCJyb2xlIjoiQ0FORElEQVRFIn0.Xd_E1HPCUE-6zlrKmP5X6r8v4EjdJwKYjHim261QO8M"
        }
    };

    var profile3 = {
        "qualification": {
            "status": "profile",
            "profile": {
                "avatar": "https://enlizt-dev.s3-sa-east-1.amazonaws.com/empty",
                "personalDetails": {
                    "firstName": "Any",
                    "lastName": "Test",
                    "phone": "48987654321"
                },
                "skills": [
                    "Java",
                    "JavaScript"
                ],
                "active": true
            }
        },
        "position": {
            "id": "55a94d5ddfb0c43975ab6bba",
            "videos": {
                "company": true,
                "leadership": true,
                "position": true
            },
            "faq": true,
            "questions": true,
            "interview": true
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDE1LTA4LTEzVDIxOjI3OjU2LjYxNloiLCJpc3MiOiI1NWMzNjJkNzMwNjJjY2RmMGNiNmZmYzkiLCJyb2xlIjoiQ0FORElEQVRFIn0.oP1D9KS0Cr0jshWkT1hT_1V0tfzmny1DM712m6UaLnY",
        "user": {
            "firstName": "Any",
            "lastName": "Test",
            "phone": "48987654321"
        }
    };

    var no_filter = {
        "qualification": {
            "status": "no_filter",
            "profile": {
                "avatar": "https://enlizt-dev.s3-sa-east-1.amazonaws.com/empty",
                "personalDetails": {
                    "firstName": "Any",
                    "lastName": "Test",
                    "phone": "48987654321"
                },
                "skills": [
                    "Java",
                    "JavaScript"
                ],
                "active": true
            }
        },
        "user": {
            "firstName": "Any",
            "lastName": "Test"
        }
    };

    $('#breadcrumb').remove();
    if (stage === 1) enlizt.temp(watch_video);
    if (stage === 2) enlizt.temp(faq);
    if (stage === 3) enlizt.temp(quiz);
    if (stage === 4) enlizt.temp(record);
    if (stage === 5) enlizt.temp(profile);
    if (stage === 6) enlizt.temp(login);
    if (stage === 7) enlizt.temp(profile2);
    if (stage === 8) enlizt.temp(no_filter);
    if (stage === 9) enlizt.temp(profile3);
};
