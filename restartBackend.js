/** Script para fazer restart ao backend no heroku */
const { exec } = require("child_process");
const progressBar = require('progress');
const readLine = require('readline');
const Promise = require('promise');

/**
 * 30 minutos = 1800000 milisegundos
 * 1 minuto = 60000 milisegundos
 * REstart Heroku 
 * https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-dyno-restart-dyno
 * tem que se estar logado.
 * heroku dyno:restart [Dyno] (no nosso caso o dyno é web, mas se não 
 * especificar-mos o Dyno sá restart a todos)
 */
let minutes = 31
let progress = new progressBar('Restarting [:bar] ', { total: minutes });
let restartAgain = true;
console.log("clica em qualquer tecla para terminar! \n\n")

confirmStop("clica em qualquer tecla para terminar!!!!!!!!!!!!!!!\n\n").then((ans) => { //Só não sei porque infernos o confirmStop não cria a mensagem para a consola
    console.log("A Fechar o programa!!!...")
    restartAgain = false;

    /**Sair do programa */
    process.exit();
    // clearInterval(timer);
})

console.log("Reiniciar a Aplicação no Heroku  a cada " + minutes + " minutos :) ")
let count = 0;
progress.tick()

function restartServer(tickAgain = true) {
    let atetetickas = tickAgain;
    // console.log(atetetickas, "lalal")
    let timer = setInterval(() => {

        /**Sair do programa */
        if (!restartAgain) {
            process.exit()
        }
        else {
            /** O que faz com que a progress bar avance */
            if (atetetickas == true) {
                progress.tick()
            }
            atetetickas = true

            /** Quando a progress bar chegar ao fim */
            if (progress.complete) {
                if (!restartAgain) {
                    process.exit()
                }

                clearInterval(timer);

                /** Executar Comando para reiniciaar servidor */
                exec('heroku dyno:restart web -a sec4allapp"', (err, stdout, stderr) => {
                    if (err) {
                        console.error('An error as ocured \n', err);
                        return;
                    }

                    /** Só para ter noção quantas vexzes isto á aconteceu */
                    count++;

                    console.log("\n\n Backend no Heroku reiniciado\n");
                    console.log(stdout);

                    /** Se Houver Algum erro imprime o */
                    if (stderr) console.log(`stderr: ${stderr}`);

                    /** Recomeçar contador e funçaõ */
                    let secInterval = setInterval(() => {
                        if (restartAgain) {
                            console.log("\n\nVoltar a reiniciar pela " + count + "º vez!!!!!!!!!!!!!!!\n")
                            progress = new progressBar('Restarting [:bar] ', { total: minutes });
                            // progress.tick()
                        }
                        restartServer(false);
                        clearInterval(secInterval);

                    }, 5000)

                    // return timer
                })
            }
        }


    }, 60000);
}

restartServer(false);

/** Função para parar de fazer restart. */
function confirmStop(text) {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.output
    })

    return new Promise((resolve, reject) => {
        return rl.question(text, ans => {
            rl.close();
            resolve(ans)
        })
    })
}

// restartServer()
// restartServer().then((timer2) => {
//     setInterval(() => {
//         if (restartAgain) {
//             progress = new progressBar(':bar ', { total: 35 });

//             count++;
//             console.log("A começar outra vez!!!!", count)
//             restartServer();
//         } else {
//             console.log("O restartAgain está a " + restartAgain + " !!!!!!!!!!!!!!!!!")
//             process.exit()
//         }
//         // }, 5000)
//     })
