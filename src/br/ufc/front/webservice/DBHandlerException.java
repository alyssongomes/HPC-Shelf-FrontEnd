
package br.ufc.front.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de DBHandlerException complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="DBHandlerException">
 *   &lt;complexContent>
 *     &lt;extension base="{http://exception.storm.ufc.br/xsd}ShelfException">
 *       &lt;sequence>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DBHandlerException", namespace = "http://exception.storm.ufc.br/xsd")
public class DBHandlerException
    extends ShelfException
{


}
