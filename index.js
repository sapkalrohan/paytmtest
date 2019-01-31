const express = require('express')
var bodyParser = require('body-parser');
var util = require('util')
const app = express()
const port = 3000
app.use(express.json())
var mysql = require('mysql');

var pool = require('./pool')

async function addAttrValue(oid,attr,value)
{
    try {
      var sql = `select * from objects i
  inner join objdata o on i.id = o.oid
  where o.oid = ` + oid + ` and attr = '`+attr+`'`
      var log = null;
      var data = await pool.query(sql);
      if(data && data.length > 0) {
        var oldval = data[0].value;
        sql = `update objdata set attr = '`+attr+`' ,value = '`+value+`' where oid = ` + oid + ` and attr = '`+attr+`'`
        data = await pool.query(sql);
        sql = `INSERT INTO log
        (oid,
        attr,
        new,
        old,
        action)
        VALUES
        (`+oid+`,
        '`+attr+`',
        '`+value+`',
        '`+oldval+`',
        'update');`
        log = await pool.query(sql);
        return "updated";
      }
      else
      {
        sql = `insert into objdata values (`+oid+`,'`+attr+`','`+value+`')`
        data = await pool.query(sql);
        sql = `INSERT INTO log
        (oid,
        attr,
        new,
        old,
        action)
        VALUES
        (`+oid+`,
        '`+attr+`',
        '`+value+`',
        NULL,
        'insert');`
        log = await pool.query(sql);
        return "inserted";
      }
    } catch (e) {
      return "fail";
    }
}
async function getItem(id) {
  var sql = `select * from objects i
  inner join objdata o on i.id = o.oid
  where parentid is null`
  if (typeof id != "undefined") sql += (" and id=" + id);

    try {
      return await pool.query(sql);
      resolve(result);
    } catch (e) {
      rej(e);
    }
}

async function getVariants(parentid,vid) {

    var sql = `select * from objects i
    inner join objdata o on i.id = o.oid
    where parentid =` + parentid 
    if (typeof vid != "undefined") sql += (" and oid=" + vid);
  
      try {
        return await pool.query(sql);
        resolve(result);
      } catch (e) {
        rej(e);
      }

}

app.get('/:itemId/:vid/',async function (req, res) {
  try {
    var rows = await getVariants(req.params["itemId"],req.params["vid"])
    res.json(rows)
  } catch(err) {
    throw new Error(err)
  }
})
app.get('/:itemId/',async function (req, res) {
  try {
    var rows = await getVariants(req.params["itemId"])
    var result = {}
    for(var i=0;i<rows.length;i++)
    {
      if(result[rows[i].oid] == undefined){
        result[rows[i].oid] = {parentid:rows[i].parentid}
      }else{
        if(result[rows[i].oid][rows[i].attr] == undefined){
          result[rows[i].oid][rows[i].attr] = rows[i].attr.value
        }
      }
    }
    console.log(result)
    res.json(rows)
  } catch(err) {
    throw new Error(err)
  }
})

app.post('/:itemId/',async function (req, res) {
  try {
    var post = req.body;
    var oid = Number(req.params["itemId"])
    var attr = post.attr
    var value = post.value
    var rows = await addAttrValue(oid,attr,value)
    res.json(rows)
  } catch(err) {
    throw new Error(err)
  }
})
app.get('/', async function (req, res) {
  try {
    var rows = await getItem(undefined)
    res.json(rows)
  } catch(err) {
    throw new Error(err)
  }
})



console.log("start listening")
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

