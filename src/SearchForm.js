import React from 'react';
import { Card } from 'react-bootstrap';
import SearchModal from './components/SearchModal'
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCard: '',
      tempCards: [],
      isOpenSearchModal: false,
      selectedCard: {},
    }
  }

  handleInput = (event) => {
    event.preventDefault();
    this.getCard(event.target.value)
    this.setState({
      searchedCard: event.target.value
    })
  }

  getCard = async (name) => {
    console.log('big', name);
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${name}`;
      console.log(url)
      let cardData = await axios.get(url);

      console.log(cardData.data)
      this.setState({
        tempCards: cardData.data
      });


    } catch (error) {
      console.log(error.message);
    }
  }

    // ********** THIS POSTS A CARD ************
    
    postCard = async (cardObj) => {
      if(this.props.auth0.isAuthenticated){
        const res = await this.props.auth0.getIdTokenClaims()
        const jwt = res.__raw
        // console.log(jwt);
        const config = {
          headers: {"Authorization": `Bearer ${jwt}`}, 
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/card',
          data: cardObj
        }
        try {
          
          let createdCard = await axios(config);
    
          this.setState({
            cards: [...this.state.cards, createdCard.data]
          });
        }
        catch (error) {
          console.log(error.message);
        }
      }
    }

  openSearchModal = (cardObj) => this.setState({ isOpenSearchModal: true, selectedCard: cardObj });

  closeSearchModal = () => this.setState({ isOpenSearchModal: false });
  
  render() {
    return (
      <>
        <form onSubmit={() => this.handleInput()}>
          <label htmlFor="">Search A Card By Name:
            <input type="text" onInput={this.handleInput} />
          </label>
        </form>

        <SearchModal
          openSearchModal={this.openSearchModal}
          onHide={this.closeSearchModal}
          isOpenSearchModal={this.state.isOpenSearchModal}
          card={this.state.selectedCard}
          postCard={this.postCard}
        />

        {
          this.state.tempCards.length > 0 ?
            this.state.tempCards.map((cardElem, idx) => {
              return (
                <Card key={idx} >
                  <Card.Img
                    onClick={() => { this.openSearchModal(cardElem) }}
                    variant="top"
                    src={cardElem.imageUrl}
                    style={{ width: '200px' }}
                  />
                  <Card.Body>
                    
                  </Card.Body>
                </Card>
              )
            },
            ) : (
              <h2>NO CARDS FOUND</h2>
            )
        }
      </>
    );
  }


}

export default withAuth0(SearchForm);