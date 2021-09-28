import React, { Component } from "react";
import { formatDateTime, formatCurrency, addZeros } from "../../hooks/format";
// import imgLogo from "../../assets/img/logo.png";
import "./styles.css";

class PrintCoupom extends Component {
  constructor(props) {
    super(props);
    const { myOrder, items } = props;
    this.myOrder = myOrder;
    this.items = items;
  }

  componentDidUpdate() {
    this.myOrder = this.props.myOrder;
    this.items = this.props.items;
  }

  render() {
    return (
      <div className="container-print pagebreak">
        <div className="header-print">
          {/* <img src={imgLogo} alt="logo" style={{ width: 80 }} /> */}
          <span>Sergin Lanches</span>
          <br />
          <p>Rua Otávio Graziani, 926, Centro, Jales/SP</p>
          <p>(17) 99654-9885</p>
          <span>CUPOM NÃO FISCAL</span>
        </div>

        <div className="line-dashed" />
        {/* PEDIDO */}
        <div className="fieldGroup">
          <strong>PEDIDO N: {addZeros(this.myOrder.id, 8)}</strong>
          <span>{formatDateTime(this.myOrder.dateTimeOrder)}</span>
        </div>
        <div className="fieldGroup">
          <strong>TIPO PEDIDO:</strong>
          <span>{this.myOrder.deliveryType}</span>
        </div>
        <div className="line-dashed" />

        {/* CLIENTE */}
        <div className="fieldGroup">
          <div className="field">
            <p>Cliente: {this.myOrder.name}</p>
            <p>
              Endereço: {this.myOrder.address},{this.myOrder.number},{" "}
              {this.myOrder.neighborhood}, {this.myOrder.city}/{this.myOrder.uf}{" "}
            </p>
            <p>Ponto Referência: {this.myOrder.PointReferences}</p>
            <p>Telefone: {this.myOrder.phone}</p>
          </div>
        </div>
        <div className="line-dashed" />

        <div className="wraper-print">
          <span>#</span>
          <span>Descrição</span>
          <span style={{ textAlign: "center" }}>Qtd</span>
          <span style={{ textAlign: "right" }}>Total</span>
        </div>
        <div className="line-dashed" />

        {this.items.map((item, idx) => {
          let vAdditional = item.additional.reduce((total, itemAddit) => {
            return total + item.amount * itemAddit.price;
          }, 0);
          return (
            <div key={idx}>
              <div className="wraper-print">
                <span>{addZeros(idx + 1, 2)}</span>
                <span style={{ textTransform: "uppercase" }}>{item.name}</span>
                <span style={{ textAlign: "center" }}>
                  {item.amount} x {item.price}
                </span>
                <span style={{ textAlign: "right" }}>
                  {formatCurrency(
                    item.amount * item.price + vAdditional,
                    "decimal"
                  )}
                </span>
              </div>
              {item.additional.length > 0 && (
                <div className="content-additional">
                  <strong>Adicionais</strong>
                  {item.additional.map((addit, idx) => {
                    return (
                      <div className="additional" key={idx}>
                        <span>{addit.description}</span>
                        <span>{addit.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {item.note && (
                <div className="content-note">
                  <strong>Observações</strong>
                  <p>{item.note}</p>
                </div>
              )}
              <div className="line-dashed" />
            </div>
          );
        })}

        {/* TOTAIS */}
        <div className="total">
          <div className="fieldGroup">
            <strong>SubTotal: </strong>
            <span>
              {formatCurrency(
                Number(this.myOrder.totalPurchase) -
                  Number(this.myOrder.vTaxaDelivery)
              )}
            </span>
          </div>
          <div className="fieldGroup">
            <strong>Desconto: </strong>
            <span>{this.myOrder.discount}</span>
          </div>
          <div className="fieldGroup">
            <strong>Taxa de entrega: </strong>
            <span>{this.myOrder.vTaxaDelivery}</span>
          </div>
          <div className="fieldGroup">
            <h5>
              <strong>T O T A L: </strong>
            </h5>
            <h5>
              <strong>{formatCurrency(this.myOrder.totalPurchase)}</strong>
            </h5>
          </div>
        </div>

        <div className="line-dashed" />

        {/* AGRADECIMENTOS */}
        <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700 }}>
          <p>AGUADECEMOS SUA PREFERENCIA !!!</p>
          <p>Emissão: {formatDateTime(new Date().getTime())}</p>
        </div>
      </div>
    );
  }
}

export default PrintCoupom;
