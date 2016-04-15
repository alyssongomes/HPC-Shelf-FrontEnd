
package br.ufc.front.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de SAXException complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="SAXException">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cause" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
 *         &lt;element name="exception" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
 *         &lt;element name="message" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SAXException", namespace = "http://sax.xml.org/xsd", propOrder = {
    "cause",
    "exception",
    "message"
})
public class SAXException {

    @XmlElementRef(name = "cause", namespace = "http://sax.xml.org/xsd", type = JAXBElement.class, required = false)
    protected JAXBElement<Object> cause;
    @XmlElementRef(name = "exception", namespace = "http://sax.xml.org/xsd", type = JAXBElement.class, required = false)
    protected JAXBElement<Object> exception;
    @XmlElementRef(name = "message", namespace = "http://sax.xml.org/xsd", type = JAXBElement.class, required = false)
    protected JAXBElement<String> message;

    /**
     * Obtém o valor da propriedade cause.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link Object }{@code >}
     *     
     */
    public JAXBElement<Object> getCause() {
        return cause;
    }

    /**
     * Define o valor da propriedade cause.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link Object }{@code >}
     *     
     */
    public void setCause(JAXBElement<Object> value) {
        this.cause = value;
    }

    /**
     * Obtém o valor da propriedade exception.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link Object }{@code >}
     *     
     */
    public JAXBElement<Object> getException() {
        return exception;
    }

    /**
     * Define o valor da propriedade exception.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link Object }{@code >}
     *     
     */
    public void setException(JAXBElement<Object> value) {
        this.exception = value;
    }

    /**
     * Obtém o valor da propriedade message.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public JAXBElement<String> getMessage() {
        return message;
    }

    /**
     * Define o valor da propriedade message.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public void setMessage(JAXBElement<String> value) {
        this.message = value;
    }

}
