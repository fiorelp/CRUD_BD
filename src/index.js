const app=require('./config/server');
require('./app/routes/socios')(app);

//inicio server

app.listen(app.get('port'),()=>{
    console.log('Activo en puerto', app.get('port'));
})