'use client';

import {Alert, Button, Label, Modal, TextInput} from 'flowbite-react';
import {FormEvent, FormEventHandler, useState} from 'react';
import {createUserAction} from './auth';
import {DataModel} from 'lib/data';
import {IAuthModel} from 'lib/data/auth_model';

export function SignUp({
  TESTING_FLAG,
  TEST_AUTH,
  TEST_MODEL,
}: {
  TESTING_FLAG?: boolean;
  TEST_AUTH?: IAuthModel;
  TEST_MODEL?: DataModel;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setError] = useState('');

  const submit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const name = (
      e.currentTarget.elements.namedItem('name') as HTMLInputElement
    ).value;
    const email = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;

    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value;

    const budget = (
      e.currentTarget.elements.namedItem('budget') as HTMLInputElement
    ).value as unknown as number;

    setOpenModal(false);

    const result = await createUserAction(
      name,
      email,
      budget,
      password,
      TESTING_FLAG,
      TEST_AUTH,
      TEST_MODEL
    );
    if (result) {
      setShowErrorAlert(true);
      setError(result.message);
    } else {
      setShowSuccessAlert(true);
    }
  };
  return (
    <>
      <Button
        data-testid="sign-up-form-button"
        className="flex max-w-lg gap-4 font-medium text-sm text-black hover:underline-offset-4 bg-white "
        onClick={() => setOpenModal(true)}
      >
        Don&apos;t have an account? Sign up
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header> Create a new Account </Modal.Header>
        <Modal.Body>
          <div className="bg-white">
            <form
              className="flex max-w-md flex-col gap-4 bg-white"
              onSubmit={submit}
            >
              <div>
                <div className="m-2 block">
                  <Label htmlFor="name" value="Your RSO name" />
                </div>
                <TextInput
                  data-testid="sign-up-form-name"
                  id="name"
                  type="name"
                  placeholder="CS_SEPC"
                  required
                />
              </div>
              <div>
                <div className="m-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  data-testid="sign-up-form-email"
                  id="email"
                  type="email"
                  placeholder="testUser@studentorg.grinnell.edu"
                  required
                />
              </div>
              <div>
                <div className="m-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  data-testid="sign-up-form-password"
                  id="password"
                  type="password"
                  placeholder="Loveweb1234@"
                  required
                />
              </div>
              <div>
                <div className="m-2 block">
                  <Label htmlFor="budget" value="Your Total budget" />
                </div>
                <TextInput
                  data-testid="sign-up-form-budget"
                  id="budget"
                  type="budget"
                  placeholder="2000"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-pallete-5"
                data-testid="sign-up-form-submit"
              >
                Create Account
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {showErrorAlert && (
        <Alert
          className="max-w-md"
          color="failure"
          onDismiss={() => setShowErrorAlert(false)}
        >
          {' '}
          Create Account Failed: {errorMessage}{' '}
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert
          className="max-w-md"
          color="success"
          onDismiss={() => setShowSuccessAlert(false)}
        >
          {' '}
          Success{' '}
        </Alert>
      )}
    </>
  );
}
