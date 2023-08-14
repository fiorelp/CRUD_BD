const dbConnection=require('../../config/dbConnection');

module.exports = app=>{
    const conexion=dbConnection();
    app.get('/',(req,res)=>{
        conexion.query('SELECT * FROM socios', (err, result)=>{
            console.log (result);
            res.render('socios.ejs',{
                socios: result
            });
        });
       
    });


    app.post('/socios',(req,res)=>{
        const nombre=req.body.nombre;
        const apellido=req.body.apellido;
        const dni=req.body.dni;
        const direccion=req.body.direccion;
        const telefono=req.body.telefono;
        const email=req.body.email;




        conexion.query('INSERT INTO socios SET?',{
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            email
            },(err,result)=>{
                if(err) {
                    console.error('error al agregar socio', err)
                }else{
                    console.log('socio agregado');
                res.redirect('/');}
            }
        )
        }
    );
   
    app.post('/borrar',(req,res)=>{
        const id=req.body.registroId;
        const query= 'DELETE FROM socios WHERE id_socio = ?';
        conexion.query(query, [id],(err,result)=>{
            if(err) {
                console.error('error borrar socio', err)
            }else{
                console.log('socio borrado');
            res.redirect('/');}
        })
    });


    app.post('/editar',(req,res)=>{
        const id=req.body.registroId;
        const {nombre , apellido, dni, direccion, telefono, email}=req.body;
        const query = 'UPDATE socios SET nombre =?,apellido=?,dni=?,direccion=?,telefono=?,email=? WHERE id_socio=?';


        conexion.query(query, [nombre,apellido,dni,direccion,telefono,email,id],(err,result)=>{
            if(err){
                console.error('Error al editar',err)
                res.status(500).send('Error al editar')
            }else{
                console.log('Registro editado')
                res.redirect('/');
            }
    })
    })


    app.get('/libros',(req,res)=>{
        conexion.query('SELECT * FROM libros',(err,result)=>{
            res.render('libros.ejs',{
                libros:result
            });
        });
    })


    app.post('/libronuevo',(req,res)=>{
        const titulo=req.body.titulo;
        const idioma=req.body.idioma;
        const ejemplares=req.body.ejemplares;




        conexion.query('INSERT INTO libros SET?',{
            titulo,
            idioma,
            ejemplares,
            },(err,result)=>{
                if(err) {
                    console.error('error al agregar libro', err)
                }else{
                    console.log('libro agregado');
                res.redirect('/libros');}
            }
        )
        }
    );


    app.post('/borrar_libro',(req,res)=>{
        const id=req.body.registroId;
        const query= 'DELETE FROM libros WHERE id_libro = ?';
        conexion.query(query, [id],(err,result)=>{
            if(err) {
                console.error('error borrar libro', err)
            }else{
                console.log('libro borrado');
            res.redirect('/libros');}
        })
    });


    app.post('/editar_libro',(req,res)=>{
        const id=req.body.registroId;
        const {titulo , idioma, ejemplares}=req.body;
        const query = 'UPDATE libros SET titulo=?,idioma=?,ejemplares=?WHERE id_libro=?';


        conexion.query(query, [titulo,idioma, ejemplares,id],(err,result)=>{
            if(err){
                console.error('Error al editar libro',err)
                res.status(500).send('Error al editar')
            }else{
                console.log('Libro editado')
                res.redirect('/libros');
            }
    })
    })


    app.get('/prestamos',(req,res)=>{
        const query= 'SELECT * FROM prestamos,libros WHERE prestamos.id_libro=libros.id_libro'
        conexion.query(query,(err,result)=>{
            res.render('prestamos.ejs',{
                prestamos:result
            });
        });
    })


    app.post('/carga_prestamo',(req,res)=>{
        const id_libro=req.body.id_libro;
        const id_ejemplar=req.body.id_ejemplar;
        const id_socio=req.body.id_socio;




        conexion.query('INSERT INTO prestamos SET?',{
            id_libro,
            id_ejemplar,
            id_socio
            },(err,result)=>{
                if(err) {
                    console.error('error al cargar prestamo', err)
                }else{
                    console.log('prestamo agregado');
                res.redirect('/prestamos');}
            }
        )
        }
    );
    app.post('/editar_prestamo',(req,res)=>{
        const id=req.body.registroId;
        const {id_libro,id_ejemplar,id_socio, id_extension}=req.body;
        const query = 'UPDATE prestamos SET  id_libro=?,id_ejemplar=?,id_socio=?,id_extension=? WHERE id_prestamo=?';


        conexion.query(query, [id_libro,id_ejemplar,id_socio,id_extension,id],(err,result)=>{
            if(err){
                console.error('Error al editar',err)
                res.status(500).send('Error al editar')
            }else{
                console.log('Registro editado')
                res.redirect('/prestamos');
            }
    })
    })


    app.post('/devolucion',(req,res)=>{
        const id=req.body.registroId;
        const query= 'DELETE FROM prestamos WHERE id_prestamo = ?';
        conexion.query(query, [id],(err,result)=>{
            if(err) {
                console.error('error devolver socio', err)
            }else{
                console.log('libro devuelto');
            res.redirect('/prestamos');}
        })
    });
}
