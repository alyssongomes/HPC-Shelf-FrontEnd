
package br.ufc.hpc.frontend.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="DBHandlerException" type="{http://exception.storm.ufc.br/xsd}DBHandlerException" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "dbHandlerException"
})
@XmlRootElement(name = "CoreServicesDBHandlerException")
public class CoreServicesDBHandlerException {

    @XmlElementRef(name = "DBHandlerException", namespace = "http://webservices.storm.ufc.br", type = JAXBElement.class, required = false)
    protected JAXBElement<DBHandlerException> dbHandlerException;

    /**
     * Gets the value of the dbHandlerException property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link DBHandlerException }{@code >}
     *     
     */
    public JAXBElement<DBHandlerException> getDBHandlerException() {
        return dbHandlerException;
    }

    /**
     * Sets the value of the dbHandlerException property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link DBHandlerException }{@code >}
     *     
     */
    public void setDBHandlerException(JAXBElement<DBHandlerException> value) {
        this.dbHandlerException = value;
    }

}
