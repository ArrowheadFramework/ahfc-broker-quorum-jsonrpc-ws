pragma solidity ^0.4.21;

contract userRegistry{

  // importing the authorisation contract for the modifier to work
  //import "authorisationRegistry.sol";

  /**
  * smart contract for creating a registry where one can enter ones credentials
  * functions that allow the authorisation to see and validate credentials
  * including public key mapping
  */
  //address caller;

  /**
  * allow only the authorisation instance to call the function
  * modifier
  */
  //modifier isAuthorisation() {}

  /**
  * registered user, as struct with updateable variables
  */
  struct registeredUser{
    address userAddress;

    string userName;
    //string pubKey;  can be implemented is address isn't sufficient
  }

  /**
  * mapping the public keys associated to the individual address
  * pubKey can be set to any applicable variable
  * mapping
  * creating array to store the addresses / pubKeys;
  */
  mapping(address => registeredUser) public users;
  address[] public registeredAddresses;

  /**
  * function to add a new User to the service registry and add to address array
  * @param _address - address of the new registrered owner.
  *
  * @param _name - name of the User.
  */
  function addUser(address _address, string _name) public {
    // passing address as key to binding the user's pubKey to the mapping
    registeredUser newUser = users[_address];

    // assigning the other attributes
    newUser.userAddress = _address;
    //newUser.ID = _ID;
    newUser.userName = _name;

    // pushing the address to the address array
    registeredAddresses.push(_address)-1;
  }

  /**
  * function to get the addresses of the registered users
  * should only be able to be called by the authorisation instance
  * modifier not yet implemented due to the authority contract missing
  * viewable function
  */
  function getAddress() view public returns( address[]) {
    return registeredAddresses;
  }

  /**
  * function to get the address of a specific registered user
  * should only be able to be called by the authorisation instance
  * modifier not yet implemented due to the authority contract missing
  * viewable function
  * @param _addressToCheck - address to be filtered by the authorisation instance.
  */
  function getAddress(address _addressToCheck) view public returns( address, string) {
    return (users[_addressToCheck].userAddress, users[_addressToCheck].userName);
  }

}
