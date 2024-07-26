Feature: Members without activity (Posts and comments)
 
Scenario: Test 1 - At least one user should not post or comment
    Given a member is logged into DDD Forum
    When I enter the statistics page, type the date "2023-12-13" and click submit for box 5
    Then the system displays the usernames that didn't interact in any way on the screen "Result: LuísAfonso, NatalyLucas, AnaAquiBobo, NunoPinto, AmbrosioDoChoco, RitaCastro, PauloTeixeira, JoaquimdoGrelo, PauloBordel, RicardoCerqueir, MariadoAço, natalilucas, JoaoNabica, AnaBelaRego, Destiney, TonydoRock, ZePorqueiro, Antwan"
 
